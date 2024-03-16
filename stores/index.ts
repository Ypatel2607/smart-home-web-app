import * as R from 'ramda';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createUserSlice } from './user-slice';
import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database';

//firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};
  
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
export const database = getDatabase(app);

const useStore: any = create(
    devtools(
        persist(
            immer((...args: any) => ({
                ...createUserSlice(...args)
            })), {
                name: 'SmartHomeApp',
                getStorage: () => localStorage,
                merge: (persistedState: any, currentState: any) => R.mergeDeepLeft(persistedState, currentState)
            }
        )
    )
);

export default useStore;