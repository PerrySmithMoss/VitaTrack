import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Calories } from '../../components/Account/Nutrition/Calories';
import { FoodDiary } from '../../components/Account/Nutrition/FoodDiary';
import { Macros } from '../../components/Account/Nutrition/Macros';
import { Navbar } from '../../components/Navbar/Navbar';
import { SidebarNav } from '../../components/SidebarNav/SidebarNav';
import { useGetCurrentUserQuery } from '../../graphql/generated/graphql';

interface NutritionPageProps {}

const NutritionPage: NextPage<NutritionPageProps> = () => {
  return (
    <>
      <Head>
        <title>Nutrition | VitaTrack</title>
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
              {/* <div className="flex items-center flex-wrap gap-6">
                <Calories />
                <Macros />
              </div> */}
              <FoodDiary />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = context.req.cookies['refreshToken'];

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

export default NutritionPage;
