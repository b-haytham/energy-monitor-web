import "../styles/globals.css";

import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';
import { useRendered } from '../hooks/useRendered';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@redux/store';
import { useEffect } from 'react';
import socket from 'src/socket';
import { fetchAll } from '@redux/global/actions';
import { User } from '@api/types/user';
import { QueryClient, QueryClientProvider } from 'react-query';

import NextNProgress from "nextjs-progressbar";
import { SnackbarProvider } from 'notistack';

import NextComponent from '@components/NextComponent';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter(); 

  useEffect(() => {
    const user = store.getState().auth.user;
    const access_token = store.getState().auth.access_token;

    if (user && access_token) {
      store.dispatch(fetchAll(user as User))
    }
    if (user && access_token) {
      socket.emit('authenticate', { access_token });
    }
  }, [])


  const rendered = useRendered();
  if (!rendered) {
    return null;
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Energy Monitor</title>
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider autoHideDuration={4000} maxSnack={5}>
              <NextNProgress
                color={theme.palette.primary.main}
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
                showOnShallow={true}
              />
              <CssBaseline />
              <QueryClientProvider client={queryClient}>
                <NextComponent Component={Component} pageProps={pageProps} />
              </QueryClientProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </CacheProvider>
  );
}
