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
  useLogoutUserMutation,
} from '../graphql/generated/graphql';
import { getDataFromDehydratedState } from '../utils/getDataFromDehydratedState';

interface HomeProps {
  dehydratedState: any;
}

const Home: NextPage<HomeProps> = ({ dehydratedState }) => {
  const queryClient = new QueryClient();
  const { data, refetch: refetchCurrentUser } =
    useGetCurrentUserQuery<GetCurrentUserQuery>(undefined, {
      // Don't think I need this because the 'initialData' is already being set
      // in getServerSideProps
      // initialData: getDataFromDehydratedState('GetCurrentUser', dehydratedState),
    });

  const { mutate: logoutUser } = useLogoutUserMutation({
    onSuccess: () => refetchCurrentUser(),
  });

  if (data?.getCurrentUser?.data?.id) {
    return (
      <div className="m-4">
        <div>
          Welcome! <div>{data.getCurrentUser.data.username}</div>
        </div>
        <button
          onClick={() => logoutUser({})}
          className="mt-4 px-4 py-2 bg-brand-green hover:bg-brand-green-hover text-white rounded"
        >
          Logout
        </button>
      </div>
    );
  }
  
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
        <div className="absolute bottom-0 z-0">
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
        <div className="flex justify-center h-screen z-10">
          <div className="hidden bg-cover lg:block lg:w-7/12">
            <div className="flex items-center h-full pl-20 z-10">
              <Hero />
            </div>
          </div>
          <div className="flex items-center w-full max-w-md pr-10 mx-auto lg:w-5/12 z-10">
            <div className="flex-1 mr-6">
              <div className="text-center">
                <h2 className="text-5xl font-bold text-center text-gray-700">
                  Log in
                </h2>
                <p className="mt-4 text-gray-500">
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

export default Home;
