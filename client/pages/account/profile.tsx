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
  const { data, isLoading } = useGetCurrentUserQuery<GetCurrentUserQuery>();

  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  });

  if (isLoading || !mounted) {
    return null;
  }
  if (!data?.getCurrentUser?.data) {
    router.push('/');
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
};

export default ProfilePage;
