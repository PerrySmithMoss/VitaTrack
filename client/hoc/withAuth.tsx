import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { useGetCurrentUserQuery } from '../graphql/generated/graphql';

interface WithAuthOptions {
  requireAuth?: boolean;
}

export const withAuth = (options?: WithAuthOptions) => {
  const requireAuth = options?.requireAuth !== false; // default to true

  return async (context: GetServerSidePropsContext) => {
    const { req, resolvedUrl } = context;
    const { cookies } = req;
    const accessToken = cookies['accessToken'];
    const isAuthRoute = resolvedUrl.startsWith('/account');

    // if we have an access token and we're not already on an auth route,
    // redirect to dashboard.
    if (accessToken && !isAuthRoute) {
      return {
        redirect: {
          destination: '/account/dashboard',
          permanent: false,
        },
      };
    }

    // no access token and trying to access protected route - redirect to home.
    if (!accessToken && requireAuth) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    // with valid token, try to validate it by fetching user data
    if (accessToken) {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 0,
            cacheTime: 0,
          },
        },
      });

      try {
        await queryClient.prefetchQuery(
          useGetCurrentUserQuery.getKey(),
          useGetCurrentUserQuery.fetcher(
            undefined,
            req.headers as Record<string, string>
          )
        );

        return {
          props: {
            dehydratedState: dehydrate(queryClient),
          },
        };
      } catch (error) {
        // token is invalid or expired, redirect to home
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    }

    // for public pages with no auth token, just return empty props
    return { props: {} };
  };
};
