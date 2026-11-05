import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';

const origin = process.env.SMOKE_API_ORIGIN ?? 'http://127.0.0.1:5500';
const id = process.env.SMOKE_ID ?? randomUUID();
const email = `release-smoke-${id}@example.invalid`;
const username = `smoke-${id}`;
const password = randomUUID();

async function graphql(query, variables = {}, cookie = '') {
  const response = await fetch(new URL('/graphql', origin), {
    method: 'POST',
    headers: { 'content-type': 'application/json', cookie },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(10000),
  });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.errors, undefined, 'GraphQL request should succeed');
  return {
    data: body.data,
    cookie: response.headers.getSetCookie().map(value => value.split(';')[0]).join('; '),
  };
}

assert.equal((await graphql('{ __typename }')).data.__typename, 'Query');
const registration = await graphql(
  'mutation ($email: String!, $password: String!, $username: String!) { createUser(email: $email, password: $password, username: $username) { data { id } } }',
  { email, password, username },
);
const userId = registration.data.createUser.data?.id;
assert.ok(userId, 'test user registration');
const loginQuery = 'mutation ($email: String!, $password: String!) { loginUserWithEmailAndPassword(email: $email, password: $password) { data { id } errors { field } } }';
assert.ok((await graphql(loginQuery, { email, password: 'invalid' })).data.loginUserWithEmailAndPassword.errors?.length);
const login = await graphql(loginQuery, { email, password });
assert.equal(login.data.loginUserWithEmailAndPassword.data?.id, userId);
const profile = await graphql(
  '{ getCurrentUser { data { id } } getCurrentUsersNutrition { data { id } } getUsersWorkouts { data { id } } }',
  {}, login.cookie,
);
assert.equal(profile.data.getCurrentUser.data?.id, userId);
assert.deepEqual(profile.data.getCurrentUsersNutrition.data, []);
assert.deepEqual(profile.data.getUsersWorkouts.data, []);
console.log('GraphQL registration, sign-in, nutrition and activity reads passed');
