import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';
import Layout from '../components/Layout';
import { useRendered } from '../hooks/useRendered';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@redux/store';
import { useEffect } from 'react';
import socket from 'src/socket';
import { fetchAll } from '@redux/global/actions';
import { User } from '@api/types/user';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

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

  useEffect(() => {
    socket.on('authenticated', (data) => {
      console.log('WS_AUTHENTICATED', data);
    })

    socket.on('device/notification', (data) => {
      console.log('WS_DEVICE_NOTIFICATION', data);
    })

    return () => {
      socket.off('authenticated');
      socket.off('device/notification');
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
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {router.pathname.includes('dash') ? (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            ): (
              <Component {...pageProps} />
            )}
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </CacheProvider>
  );
}
