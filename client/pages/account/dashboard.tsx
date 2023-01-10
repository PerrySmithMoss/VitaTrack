import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { TodaysMacros } from '../../components/Account/Dashboard/TodaysMacros/TodaysMacros';
import { Navbar } from '../../components/Navbar/Navbar';
import { SidebarNav } from '../../components/SidebarNav/SidebarNav';
import {
  GetCurrentUserQuery,
  useGetCurrentUserQuery,
  useGetCurrentUsersGoalsQuery,
} from '../../graphql/generated/graphql';
import { TodaysWorkout } from '../../components/Account/Dashboard/TodaysWorkout/TodaysWorkout';
import { TrendCard } from '../../components/Account/Dashboard/TrendCard/TrendCard';
import { Recipes } from '../../components/Account/Dashboard/Recipes/Recipes';
import { CaloriesGraph } from '../../components/Account/Dashboard/CaloriesGraph/CaloriesGraph';
import { Wave } from '../../components/Svgs/Home/Wave';
import { Logo } from '../../components/Svgs/Logo/Logo';
import { SetupForm } from '../../components/Account/Dashboard/SetupForm/SetupForm';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SyncLoader } from 'react-spinners';

interface DashboardPageProps {}

const DashboardPage: NextPage<DashboardPageProps> = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { data: usersGoals } = useGetCurrentUsersGoalsQuery();
  const { data: user, isLoading } =
    useGetCurrentUserQuery<GetCurrentUserQuery>();

  useEffect(() => {
    setMounted(true);
  });

  if (isLoading || !mounted) {
    return null;
  }
  if (!user?.getCurrentUser?.data) {
    router.push('/');
  }
  if (!isLoading && user?.getCurrentUser?.data?.hasGoals) {
    return (
      <>
        <Head>
          <title>Dashboard | VitaTrack</title>
          <meta
            name="description"
            content="VitaTrack is a one stop shop to track all of your nutrition and gym performance."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="relative min-h-screen h-full flex flex-col flex-auto flex-shrink-0 antialiased bg-white">
          <div className="flex h-screen w-full">
            <SidebarNav />
            <main className="w-full">
              <Navbar />
              <div className="pl-4 pt-3 pb-4 xs:p-8">
                <div className="flex items-center flex-wrap gap-6">
                  <TodaysMacros />
                  <TodaysWorkout />
                  <section className="mt-2 flex-grow">
                    <h2 className="text-2xl font-bold text-[#2b3042]">
                      Trends
                    </h2>
                    <TrendCard
                      title="Bodyweight"
                      value={
                        usersGoals?.getCurrentUsersGoals.data
                          ?.currentWeight as number
                      }
                    />
                    <TrendCard
                      title="Steps"
                      value={
                        usersGoals?.getCurrentUsersGoals.data
                          ?.dailySteps as number
                      }
                    />
                  </section>
                </div>
                {/* <div className="grid grid-cols-12 gap-10 mt-10">
                  <Recipes />
                  <CaloriesGraph />
                </div> */}
              </div>
            </main>
          </div>
        </div>
      </>
    );
  } else if (!isLoading && user?.getCurrentUser?.data?.hasGoals === false) {
    return (
      <>
        <Head>
          <title>Dashboard | VitaTrack</title>
          <meta
            name="description"
            content="VitaTrack is a one stop shop to track all of your nutrition and gym performance."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="bg-white relative">
          <div className="absolute bottom-0 z-0">
            <Wave />
          </div>
          <div className="absolute top-0 w-full border-b">
            <div className="flex items-center py-3 justify-between">
              <div className="flex space-x-2 items-center mx-24">
                <div>
                  <Logo height={26} width={32} />
                </div>
                <h1 className="text-[24px] font-bold text-gray-700">
                  VitaTrack
                </h1>
              </div>
              <div className="mx-24">
                <a className="font-bold cursor-pointer text-brand-green hover:text-brand-green-hover">
                  Log in
                </a>
              </div>
            </div>
          </div>
          <SetupForm />
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

export default DashboardPage;
