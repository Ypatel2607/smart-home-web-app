import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import router from 'next/router';
import useStore, { auth } from '../stores';
import { onAuthStateChanged } from 'firebase/auth';

// Create a context for authentication state
const AuthContext = React.createContext(null);

// Custom hook to use the AuthContext
function useAuth() {
  return React.useContext(AuthContext);
}
 
function SmartHomeApp({ Component, pageProps }: AppProps) {
  const { userStatus, setUserStatus, userData, resetGlobalState } = useStore(); 

  if (!userStatus) {
    resetGlobalState();
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if(user) {
        setUserStatus(true);
      } else {
        setUserStatus(false);
      }
    });
  }, []);

  // Redirect to login page if user is not authenticated
  useEffect(() => {
    if (!userStatus && router.pathname !== '/') {
      router.push('/');
    }
  }, [userStatus, router]);

  return (
    <AuthContext.Provider value={userData}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default SmartHomeApp