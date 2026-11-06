import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSidePropsContext } from 'next';
import { useGetCurrentUserQuery } from '../graphql/generated/graphql';

interface WithAuthOptions {
  requireAuth?: boolean;
}

export const withAuth = (options?: WithAuthOptions) => {
  const requireAuth = options?.requireAuth !== false;

  return async ({ req, resolvedUrl }: GetServerSidePropsContext) => {
    const redirectToLogin = { redirect: { destination: '/', permanent: false } };
    if (!req.cookies.accessToken) {
      return requireAuth ? redirectToLogin : { props: {} };
    }

    const queryClient = new QueryClient();
    try {
      const user = await queryClient.fetchQuery({
        queryKey: useGetCurrentUserQuery.getKey(),
        queryFn: useGetCurrentUserQuery.fetcher(undefined, {
          cookie: req.headers.cookie ?? '',
        }),
      });

      if (user.getCurrentUser?.data) {
        if (!resolvedUrl.startsWith('/account')) {
          return {
            redirect: { destination: '/account/dashboard', permanent: false },
          };
        }
        return { props: { dehydratedState: dehydrate(queryClient) } };
      }
    } catch {
      // A failed authentication check should leave the visitor signed out.
    }

    return requireAuth ? redirectToLogin : { props: {} };
  };
};
