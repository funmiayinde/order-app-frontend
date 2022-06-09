import type { AppProps } from 'next/app'
import Router from 'next/router';
import nProgress from 'nprogress';
import { createEmotionCache } from '../_shared/util/helpers';
import { CacheProvider } from '@emotion/react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { persistor, store } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '../theme';
import { CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';


Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

const clientSideEmotionCache = createEmotionCache();

const App = (props: AppProps | Record<any, any>) => {
  const { Component, pageProps } = props;

  // console.log('getLayout:', Component.getLayout);

  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <title>Order Manager App</title>
      </Head>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={createTheme({
            direction: 'ltr',
            responsiveFontSizes: true,
            theme: 'light',
          })}>
            <CssBaseline />
            <Toaster position="top-center" />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </CacheProvider>
  )
}

export default App;
