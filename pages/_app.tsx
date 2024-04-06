import React, { PropsWithChildren, useEffect } from 'react';
import type { AppProps } from 'next/app';
import router from 'next/router';
import useStore, { auth } from '../stores';
import { onAuthStateChanged } from 'firebase/auth';
import { NextPage } from 'next';
import Head from 'next/head';
import { Box } from '@mui/material';
import AuthedLayout from '@/components/Layout/AuthedLayout';
import AnonLayout from '@/components/Layout/AnonLayout';
import SuccessErrorAlert from '@/components/utils/SuccessErrorAlert';

// Create a context for authentication state
const AuthContext = React.createContext(null);

// Custom hook to use the AuthContext
function useAuth() {
  return React.useContext(AuthContext);
}

const LayoutProvider = ({ children }: PropsWithChildren) => {
  const { userStatus, setUserStatus, resetGlobalState } = useStore(); 

  useEffect(() => {
    if (!userStatus) {
      //reseting all global state to it's intial state
      resetGlobalState();
    }
  },[userStatus]);
  
  useEffect(() => {
    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserStatus(true);
      } else {
        setUserStatus(false);
        // Redirect to login page if not authenticated
        if (router.pathname !== '/') {
          router.push('/');
        }
      }
    });
  }, []);

  return (
    userStatus ?
      <AuthedLayout>
        { children }
      </AuthedLayout> 
    :
      <AnonLayout>
        { children }
      </AnonLayout>
  )  
 }

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P,IP> & {
  getLayout?: ({ children }: PropsWithChildren) => JSX.Element
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
 
function SmartHomeApp({ Component, pageProps, ...props }: AppPropsWithLayout) {
  const PageLayout = Component.getLayout ?? LayoutProvider

  return (
    <AuthContext.Provider value={null}>
      <Head>
        <title>SmartHomeApp</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico?" />
      </Head>
      <Box sx={{ display: 'flex', margin: '-8px' }}>
        <PageLayout>
          <Component {...pageProps} />
          <SuccessErrorAlert />
        </PageLayout>
      </Box>
    </AuthContext.Provider>
  );
}

export default SmartHomeApp;