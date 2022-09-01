import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar/Navbar';
import { SidebarNav } from '../../components/SidebarNav/SidebarNav';
import {
  GetCurrentUserQuery,
  useGetCurrentUserQuery,
} from '../../graphql/generated/graphql';
import { MyWorkouts } from '../../components/Account/Dashboard/MyWokouts/MyWorkouts';
import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';
import { AddWorkoutModal } from '../../components/Modals/Workouts/AddWorkoutModal';

interface DashboardPageProps {}

const DashboardPage: NextPage<DashboardPageProps> = () => {
  const { data, refetch: refetchCurrentUser } =
    useGetCurrentUserQuery<GetCurrentUserQuery>();

  const [isAddWorkoutModalOpen, setIsAddWorkoutModalOpen] = useState(false);

  if (data?.getCurrentUser?.data?.id) {
    return (
      <>
        <Head>
          <title>Workouts | VitaTrack</title>
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
                <section>
                  <MyWorkouts />
                </section>
              </div>
              {isAddWorkoutModalOpen && (
                <AddWorkoutModal
                  open={isAddWorkoutModalOpen}
                  onClose={() => setIsAddWorkoutModalOpen(false)}
                  selector="addWorkoutModal"
                />
              )}
              <button
                onClick={() => setIsAddWorkoutModalOpen(true)}
                title="Add Workout"
                className="fixed z-90 bottom-10 right-8 bg-brand-green w-16 h-16 md:w-20 md:h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-brand-green-hover "
              >
                <AiOutlinePlus size={45} color="white" />
              </button>
            </main>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Workouts | VitaTrack</title>
        <meta
          name="description"
          content="VitaTrack is a one stop shop to track all of your nutrition and gym performance."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white relative">
        <h1 className="text-6xl ">You must log in!</h1>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { cookie } = context.req.headers;
  if (!cookie) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

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
