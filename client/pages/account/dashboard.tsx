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
  useLogoutUserMutation,
} from '../../graphql/generated/graphql';
import { TodaysWorkout } from '../../components/Account/Dashboard/TodaysWorkout/TodaysWorkout';
import { TrendCard } from '../../components/Account/Dashboard/TrendCard/TrendCard';
import { Wave } from '../../components/Svgs/Home/Wave';
import { Logo } from '../../components/Svgs/Logo/Logo';
import { SetupForm } from '../../components/Account/Dashboard/SetupForm/SetupForm';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';
import { withAuth } from '../../hoc/withAuth';
import { LoadingPage } from '../../components/Loaders/LoadingPage';

interface DashboardPageProps {}

const DashboardPage: NextPage<DashboardPageProps> = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const { data: usersGoals } = useGetCurrentUsersGoalsQuery();
  const { data: user, isLoading } =
    useGetCurrentUserQuery<GetCurrentUserQuery>();

  const { mutate: logoutUser } = useLogoutUserMutation({
    onSuccess: () => router.push('/'),
  });

  const handleLogOut = () => {
    logoutUser({});
  };

  useEffect(() => {
    setMounted(true);

    // Handle authentication redirect after we know we're on the client
    // and the query has finished loading with no user data
    if (mounted && !isLoading && !user?.getCurrentUser?.data) {
      router.push('/');
    }
  }, [mounted, isLoading, user, router]);

  // Show nothing during initial client-side hydration or while loading user data
  if (!mounted || isLoading || !user?.getCurrentUser?.data?.id) {
    return <LoadingPage pageTitle="VitaTrack" />;
  }

  // User is authenticated but needs to complete setup
  if (
    !isLoading &&
    user?.getCurrentUser?.data &&
    !user.getCurrentUser.data.hasGoals
  ) {
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
          <div className="absolute bottom-0 z-0 w-full">
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
                <button
                  onClick={handleLogOut}
                  className="cursor-pointer text-brand-green hover:text-brand-green-hover"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
          <SetupForm />
        </div>
      </>
    );
  }

  // User is fully authenticated with goals set up
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
              </div>
            </main>
          </div>
        </div>
      </>
    );
  }

  // Fallback loading screen (this should rarely be reached)
  return (
    <div className="flex justify-center items-center h-screen">
      <SyncLoader color={'#00CC99'} size={25} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth();

export default DashboardPage;
