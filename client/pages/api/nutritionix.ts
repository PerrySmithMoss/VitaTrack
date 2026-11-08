import type { NextApiRequest, NextApiResponse } from 'next';
import { customFetcher } from '../../graphql/fetcher.ts';

const provider = 'https://trackapi.nutritionix.com/v2';
const currentUserQuery = '{ getCurrentUser { data { id } } }';

type CurrentUserResult = {
  getCurrentUser: { data: { id: string } | null } | null;
};

function providerRequest(body: unknown) {
  if (
    !body ||
    typeof body !== 'object' ||
    !('action' in body) ||
    !('value' in body) ||
    typeof body.value !== 'string'
  ) {
    return null;
  }
  const value = body.value.trim();
  if (!value || value.length > 256) return null;

  switch (body.action) {
    case 'search':
      return {
        action: body.action,
        url: `${provider}/search/instant?${new URLSearchParams({ query: value })}`,
      };
    case 'branded':
      return {
        action: body.action,
        url: `${provider}/search/item?${new URLSearchParams({ nix_item_id: value })}`,
      };
    case 'common':
      return {
        action: body.action,
        url: `${provider}/natural/nutrients`,
        body: JSON.stringify({ query: value, timezone: 'Europe/London' }),
      };
    default:
      return null;
  }
}

export const config = { api: { bodyParser: { sizeLimit: '2kb' } } };

export default async function nutritionix(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Cache-Control', 'private, no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }
  if (req.headers['content-type']?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    return res.status(415).json({ message: 'Expected a JSON request' });
  }

  const request = providerRequest(req.body);
  if (!request) {
    return res.status(400).json({ message: 'Invalid food lookup' });
  }
  if (!req.cookies.accessToken) {
    return res.status(401).json({ message: 'Sign in to look up foods' });
  }

  try {
    const user = await customFetcher<CurrentUserResult, never>(
      currentUserQuery,
      undefined,
      { cookie: req.headers.cookie ?? '' }
    )();
    if (!user.getCurrentUser?.data?.id) {
      return res.status(401).json({ message: 'Sign in to look up foods' });
    }
  } catch {
    return res.status(503).json({ message: 'Could not verify your session' });
  }

  const appId = process.env.NUTRITIONIX_APP_ID;
  const appKey = process.env.NUTRITIONIX_APP_KEY;
  if (!appId || !appKey) {
    return res.status(503).json({ message: 'Food lookup is unavailable' });
  }

  try {
    const headers = {
      'x-app-id': appId,
      'x-app-key': appKey,
      'x-remote-user-id': '0',
      ...(request.body ? { 'Content-Type': 'application/json' } : {}),
    };
    const response = await fetch(request.url, {
      method: request.body ? 'POST' : 'GET',
      headers,
      body: request.body,
      redirect: 'error',
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      console.warn('Nutritionix lookup failed', request.action, response.status);
      return res.status(502).json({ message: 'Food lookup is unavailable' });
    }

    return res.status(200).json(await response.json());
  } catch {
    return res.status(502).json({ message: 'Food lookup is unavailable' });
  }
}
