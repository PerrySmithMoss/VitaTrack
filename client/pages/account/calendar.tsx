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

interface CalendarPageProps {}

const CalendarPage: NextPage<CalendarPageProps> = () => {
  const { data, refetch: refetchCurrentUser } =
    useGetCurrentUserQuery<GetCurrentUserQuery>();

  // TODO: Possibly add custom styling https://github.com/jquense/react-big-calendar#custom-styling
  // TODO: Possibly add drag & drop capabilities
  // https://github.com/christopher-caldwell/react-big-calendar-demo/blob/master/src/App.tsx
  //  http://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/about-big-calendar--page
  
  if (data?.getCurrentUser?.data?.id) {
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
    <>
      <Head>
        <title>Dashboard | VitaTrack</title>
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

export default CalendarPage;
