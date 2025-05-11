import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { useGetCurrentUserQuery } from '../graphql/generated/graphql';

export const withAuth = () => {
  return async (context: GetServerSidePropsContext) => {
    const { req, resolvedUrl } = context;
    const { cookies } = req;
    const accessToken = cookies['accessToken'];
    const refreshToken = cookies['refreshToken'];

    if (!accessToken && !refreshToken) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    if (accessToken && !resolvedUrl.startsWith('/account')) {
      return {
        redirect: {
          destination: '/account/dashboard',
          permanent: false,
        },
      };
    }

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
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  };
};
