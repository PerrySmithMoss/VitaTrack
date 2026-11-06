const stateKey = 'vitatrack.googleOAuthState';

export function getGoogleOAuthURL(state?: string) {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

  const options = {
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL as string,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };

  const qs = new URLSearchParams(options);
  if (state) qs.set('state', state);

  return `${rootUrl}?${qs.toString()}`;
}

export function startGoogleOAuth(event: { preventDefault(): void }) {
  event.preventDefault();
  const state = crypto.randomUUID();
  sessionStorage.setItem(stateKey, state);
  window.location.assign(getGoogleOAuthURL(state));
}

export function consumeGoogleOAuthCode(
  code: string | string[] | undefined,
  state: string | string[] | undefined
) {
  if (typeof code !== 'string' || typeof state !== 'string') return;
  const expectedState = sessionStorage.getItem(stateKey);
  if (!expectedState || state !== expectedState) return;
  sessionStorage.removeItem(stateKey);
  return code;
}
