import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LoginForm } from '../components/Login/LoginForm';
import { Hero } from '../components/Svgs/Home/Hero';
import { Wave } from '../components/Svgs/Home/Wave';
import { Logo } from '../components/Svgs/Logo/Logo';
import {
  GetCurrentUserQuery,
  useGetCurrentUserQuery,
} from '../graphql/generated/graphql';
import { withAuth } from '../hoc/withAuth';
import { LoadingPage } from '../components/Loaders/LoadingPage';

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { data, isLoading } = useGetCurrentUserQuery<GetCurrentUserQuery>();

  useEffect(() => {
    setMounted(true);

    // Redirect to dashboard if user is already logged in
    if (mounted && data?.getCurrentUser?.data && !isLoading) {
      router.push('/account/dashboard');
    }
  }, [mounted, isLoading, data, router]);

  // Show nothing during initial client-side hydration or while loading user data
  if (!mounted || isLoading || data?.getCurrentUser?.data?.id) {
    return <LoadingPage pageTitle="VitaTrack" />;
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
        <div className="absolute bottom-0 z-0 w-full">
          <Wave />
        </div>
        <div className="flex items-center top-0">
          <div className="flex items-center mx-6 xs:mx-6 mt-4">
            <div className="">
              <Logo height={26} width={32} />
            </div>
            <h1 className="text-xl xs:text-2xl font-bold text-gray-700 text-right">
              VitaTrack
            </h1>
          </div>
        </div>
        <div className="flex justify-center h-screen z-10">
          <div className="hidden bg-cover lg:block lg:w-7/12">
            <div className="flex items-center h-full pl-20 z-10">
              <Hero />
            </div>
          </div>
          <div className="flex items-center w-full max-w-md lg:pr-10 mx-auto lg:w-5/12 z-10">
            <div className="flex-1 lg:mr-6 px-6">
              <div className="text-center">
                <h2 className="text-3xl xs:text-5xl font-bold text-center text-gray-700">
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
                    className="text-blue-500 cursor-pointer focus:outline-none focus:underline hover:underline"
                    href="/sign-up"
                  >
                    Sign up
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

export const getServerSideProps: GetServerSideProps = withAuth();

export default Home;
