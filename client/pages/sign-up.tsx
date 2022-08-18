import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { LoginForm } from '../components/Home/Login/LoginForm';
import { SignUpForm } from '../components/SignUp/SignUpForm';
import { Hero } from '../components/Svgs/Home/Hero';
import { Wave } from '../components/Svgs/Home/Wave';
import { Logo } from '../components/Svgs/Logo/Logo';

interface SignUpPageProps {
}

const SignUpPage: NextPage<SignUpPageProps> = () => {
  return (
    <>
      <Head>
        <title>Sign up | VitaTrack</title>
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
                  Sign up
                </h2>
                <p className="mt-4 text-gray-500">
                  Sign up now and track your nutrion and workouts for free.
                </p>
                <SignUpForm />
              </div>
              <div className="mt-8">
                <p className="mt-6 text-sm text-center text-gray-400">
                  Already have an account?{' '}
                  <Link
                    className="cursor-pointer focus:outline-none focus:underline hover:underline"
                    href="/"
                  >
                    <a className="text-blue-500 cursor-pointer focus:outline-none focus:underline hover:underline">
                      Log in
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(
//     useGetCurrentUserQuery.getKey(),
//     useGetCurrentUserQuery.fetcher(
//       undefined,
//       context.req.headers as Record<string, string>
//     )
//   );

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

export default SignUpPage;
