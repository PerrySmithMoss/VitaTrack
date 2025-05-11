import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar/Navbar';
import { SidebarNav } from '../../components/SidebarNav/SidebarNav';
import {
  GetCurrentUserQuery,
  useGetCurrentUserQuery,
} from '../../graphql/generated/graphql';
import { MySchedule } from '../../components/Account/Dashboard/MySchedule/MySchedule';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SyncLoader from 'react-spinners/SyncLoader';
import { withAuth } from '../../hoc/withAuth';

interface CalendarPageProps {}

const CalendarPage: NextPage<CalendarPageProps> = () => {
  const { data, isLoading } = useGetCurrentUserQuery<GetCurrentUserQuery>();

  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    // Handle authentication redirect after we know we're on the client
    // and the query has finished loading with no user data
    if (mounted && !isLoading && !data?.getCurrentUser?.data?.id) {
      router.push('/');
    }
  }, [mounted, isLoading, data, router]);

  if (isLoading || !mounted) {
    return null;
  }

  if (!isLoading && data?.getCurrentUser?.data?.id) {
    return (
      <>
        <Head>
          <title>Calendar | VitaTrack</title>
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
              <div className="p-8">
                <section className="grid auto-cols-fr gap-10 mt-10">
                  <MySchedule />
                </section>
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

export const getServerSideProps: GetServerSideProps = withAuth();

export default CalendarPage;
