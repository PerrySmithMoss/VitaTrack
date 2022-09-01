import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GlobalContextProvider } from '../context/global.context';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalContextProvider>
          <Component {...pageProps} />
        </GlobalContextProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
