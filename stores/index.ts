import * as R from 'ramda';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { createSystemSlice } from './system-slice';
import { createUserSlice } from './user-slice';
import { createDeviceSlice } from './device-slice';

//firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDA7ptIim_K8SYORsIwGOfM90wKBIFkWCU',
    authDomain: 'smart-home-app-6506e.firebaseapp.com',
    databaseURL: 'https://smart-home-app-6506e-default-rtdb.firebaseio.com',
    projectId: 'smart-home-app-6506e',
    storageBucket: 'smart-home-app-6506e.appspot.com',
    messagingSenderId: '653023811852',
    appId: '1:653023811852:web:6492804aeff3f7cc9a5129',
    measurementId: 'G-7LFHTMNV0R'
};
  
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

//get authentication from firebase
export const auth = getAuth(app);

// Get a reference to the database service
export const database = getDatabase(app);

const useStore: any = create(
    devtools(
        persist(
            immer((...args: any) => ({
                ...createSystemSlice(...args),
                ...createUserSlice(...args),
                ...createDeviceSlice(...args)
            })), {
                name: 'SmartHomeApp',
                getStorage: () => localStorage,
                merge: (persistedState: any, currentState: any) => R.mergeDeepLeft(persistedState, currentState)
            }
        )
    )
);

export default useStore;