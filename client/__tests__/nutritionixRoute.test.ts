import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { NextApiRequest, NextApiResponse } from 'next';

process.env.NEXT_PUBLIC_SERVER_ENDPOINT = 'https://api.example.test';
process.env.NUTRITIONIX_APP_ID = 'test-provider-id';
process.env.NUTRITIONIX_APP_KEY = 'test-provider-key';
const { default: handler } = await import('../pages/api/nutritionix.ts');

async function lookup(
  body: unknown,
  token?: string,
  contentType = 'application/json'
) {
  let status = 200;
  let result: unknown;
  const headers = new Headers();
  const request = {
    method: 'POST',
    body,
    headers: { 'content-type': contentType, cookie: token && `accessToken=${token}` },
    cookies: { accessToken: token },
  } as unknown as NextApiRequest;
  const response = {
    setHeader(name: string, value: string) {
      headers.set(name, value);
    },
    status(code: number) {
      status = code;
      return this;
    },
    json(payload: unknown) {
      result = payload;
    },
  };
  await handler(request, response as unknown as NextApiResponse);
  return { status, result, headers };
}

test('does not call Nutritionix for anonymous or invalid sessions', async (t) => {
  const fetch = t.mock.method(globalThis, 'fetch', async (url: string) => {
    assert.equal(url, 'https://api.example.test/graphql');
    return Response.json({ data: { getCurrentUser: null } });
  });
  const request = { action: 'search', value: 'banana' };

  assert.equal((await lookup(request)).status, 401);
  assert.equal(fetch.mock.callCount(), 0);
  assert.equal((await lookup(request, 'forged')).status, 401);
  assert.equal(fetch.mock.callCount(), 1);
});

test('rejects non-JSON requests and actions outside the lookup allowlist', async (t) => {
  const fetch = t.mock.method(globalThis, 'fetch');

  assert.equal((await lookup({ action: 'search', value: 'banana' }, 'session', 'text/plain')).status, 415);
  assert.equal((await lookup({ action: 'https://example.test', value: 'banana' }, 'session')).status, 400);
  assert.equal(fetch.mock.callCount(), 0);
});

test('routes authenticated lookups to Nutritionix with server credentials and no caching', async (t) => {
  const calls: Request[] = [];
  t.mock.method(globalThis, 'fetch', async (url: string, options?: RequestInit) => {
    const request = new Request(url, options);
    if (request.url === 'https://api.example.test/graphql') {
      assert.equal(request.headers.get('cookie'), 'accessToken=session');
      assert.equal(request.headers.get('x-app-key'), null);
      return Response.json({ data: { getCurrentUser: { data: { id: '1' } } } });
    }
    calls.push(request);
    return Response.json({ fixture: true });
  });

  const search = await lookup({ action: 'search', value: 'apple & pear' }, 'session');
  await lookup({ action: 'branded', value: 'item-id' }, 'session');
  await lookup({ action: 'common', value: 'apple' }, 'session');

  assert.equal(search.status, 200);
  assert.deepEqual(search.result, { fixture: true });
  assert.equal(search.headers.get('Cache-Control'), 'private, no-store');
  assert.deepEqual(calls.map((request) => [request.method, request.url]), [
    ['GET', 'https://trackapi.nutritionix.com/v2/search/instant?query=apple+%26+pear'],
    ['GET', 'https://trackapi.nutritionix.com/v2/search/item?nix_item_id=item-id'],
    ['POST', 'https://trackapi.nutritionix.com/v2/natural/nutrients'],
  ]);
  for (const request of calls) {
    assert.equal(request.headers.get('x-app-id'), 'test-provider-id');
    assert.equal(request.headers.get('x-app-key'), 'test-provider-key');
    assert.equal(request.headers.get('cookie'), null);
    assert.equal(request.redirect, 'error');
  }
  assert.deepEqual(await calls[2].json(), { query: 'apple', timezone: 'Europe/London' });
});

test('returns a generic failure without forwarding the provider error body', async (t) => {
  t.mock.method(console, 'warn', () => {});
  t.mock.method(globalThis, 'fetch', async (url: string) =>
    url === 'https://api.example.test/graphql'
      ? Response.json({ data: { getCurrentUser: { data: { id: '1' } } } })
      : Response.json({ message: 'unauthorized', id: 'private-provider-id' }, { status: 401 })
  );

  const response = await lookup({ action: 'search', value: 'banana' }, 'session');
  assert.equal(response.status, 502);
  assert.deepEqual(response.result, { message: 'Food lookup is unavailable' });
});
