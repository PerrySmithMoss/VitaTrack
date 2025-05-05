import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';
import { MyProfile } from '../../components/Account/Profile/MyProfile';
import { Navbar } from '../../components/Navbar/Navbar';
import { SidebarNav } from '../../components/SidebarNav/SidebarNav';
import {
  GetCurrentUserQuery,
  useGetCurrentUserQuery,
} from '../../graphql/generated/graphql';

interface ProfilePageProps {}

const ProfilePage: NextPage<ProfilePageProps> = () => {
  const { data, isLoading, isError, error } =
    useGetCurrentUserQuery<GetCurrentUserQuery>();

  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    // Handle authentication redirect after we know we're on the client
    // and the query has finished loading with no user data
    if (mounted && !isLoading && !data?.getCurrentUser?.data) {
      router.push('/');
    }
  }, [mounted, isLoading, data, router]);

  if (isLoading || !mounted) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SyncLoader color={'#00CC99'} size={25} />
      </div>
    );
  }

  if (isError) {
    console.error('Authentication error:', error);
    // Don't redirect here - let the useEffect handle it
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            Authentication error. Please try logging in again.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-brand-green hover:bg-brand-green-hover text-white rounded"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  if (data?.getCurrentUser?.data) {
    return (
      <>
        <Head>
          <title>Profile | VitaTrack</title>
          <meta
            name="description"
            content="VitaTrack is a one stop shop to track all of your nutrition and gym performance."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="relative min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white">
          <div className="flex h-screen w-full">
            <SidebarNav />
            <main className="w-full">
              <Navbar />
              <div className="p-4 md:p-8">
                <MyProfile />
              </div>
            </main>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <SyncLoader color={'#00CC99'} size={25} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const cookie = context.req.cookies['refreshToken'];

  // Not working in production due to the front-end and back-end being on different domians
  // if (!cookie) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   };
  // }

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery(
      useGetCurrentUserQuery.getKey(),
      useGetCurrentUserQuery.fetcher(
        undefined,
        context.req.headers as Record<string, string>
      )
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    console.error('Error prefetching user data:', error);

    // If prefetching fails, redirect to login
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default ProfilePage;
