import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GlobalContextProvider } from '../state/context/global.context';
import { ExercisesContextProvider } from '../state/context/exercise.context';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalContextProvider>
          <ExercisesContextProvider>
            <Component {...pageProps} />
          </ExercisesContextProvider>
        </GlobalContextProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
