import Head from 'next/head';
import { Logo } from '../Svgs/Logo/Logo';

interface LoadingPageProps {
  pageTitle: string;
  pageDescription?: string | null;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({
  pageTitle,
  pageDescription,
}) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={pageDescription || 'Loading VitaTrack'}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center justify-center h-screen w-screen bg-white">
        <div className="animate-pulse">
          <Logo height={52} width={64} />
        </div>
      </div>
    </>
  );
};
