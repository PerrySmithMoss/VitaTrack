import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { LoginForm } from '../components/Home/Login/LoginForm';
import { Hero } from '../components/Svgs/Home/Hero';
import { Wave } from '../components/Svgs/Home/Wave';
import { Logo } from '../components/Svgs/Logo/Logo';
import {
  GetCurrentUserQuery,
  useGetCurrentUserQuery,
} from '../graphql/generated/graphql';

interface HomeProps {
  dehydratedState: any;
}

const Home: NextPage<HomeProps> = ({ dehydratedState }) => {
  console.log("dehydratedState: ", dehydratedState)
  const { data, isLoading, isError } =
    useGetCurrentUserQuery<GetCurrentUserQuery>();

      if (data?.getCurrentUser?.id) {
        return (
          <div>
            Welcome! <div>{JSON.stringify(data.getCurrentUser.username, null, 2)}</div>
          </div>
        );
      }
  console.log("data: ", data)

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Something went wrong while fetching user.</div>;
  return (
    <>
      <Head>
        <title>VitaTrack</title>
        <meta
          name="description"
          content="VitaTrack is a one stop shop to track all of your nutrition and gym performance."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white relative">
        <div className="absolute bottom-0">
          <Wave />
        </div>
        <div className="absolute top-0">
          <div className="flex items-center mx-10 mt-4">
            <div className="">
              <Logo height={26} width={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-700">VitaTrack</h1>
          </div>
        </div>
        <div className="flex justify-center h-screen">
          <div className="hidden bg-cover lg:block lg:w-7/12">
            <div className="flex items-center h-full pl-20">
              <Hero />
            </div>
          </div>
          <div className="flex items-center w-full max-w-md pr-10 mx-auto lg:w-5/12">
            <div className="flex-1 mr-6">
              <div className="text-center">
                <h2 className="text-5xl font-bold text-center text-gray-700">
                  Log in
                </h2>
                <p className="mt-3 text-gray-500">
                  Log in to access your account
                </p>
                <LoginForm />
              </div>
              <div className="mt-8">
                <p className="mt-6 text-sm text-center text-gray-400">
                  Don&#x27;t have an account yet?{' '}
                  <Link
                    className="cursor-pointer focus:outline-none focus:underline hover:underline"
                    href="/sign-up"
                  >
                    <a className="text-blue-500 cursor-pointer focus:outline-none focus:underline hover:underline">
                      Sign up
                    </a>
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const data = await fetcher(
  //   `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
  //   context.req.headers
  // );

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    useGetCurrentUserQuery.getKey(),
    useGetCurrentUserQuery.fetcher()
  );

  // return { props: { fallbackData: data } };
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
