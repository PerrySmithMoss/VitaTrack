import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { GlobalContextProvider } from '../state/context/global.context';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalContextProvider>
            <Component {...pageProps} />
        </GlobalContextProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
