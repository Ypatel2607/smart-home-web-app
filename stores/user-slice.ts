import { ref, set } from 'firebase/database';
import { auth, database } from './index';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { produce } from 'immer';

const initialState: any = {
    userStatus: false,
    userData: {
        id: '',
        name: '',
        email: '',
    },
    newUserData: { 
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    },
    registeringError: '',
    loginError: '',
    logoutError: '',
    resetPasswordErrorEmail: ''
}

export const createUserSlice = (setState?: any, getState?: any, storeApi?: any) => ({
    resetUserSlice: () => {
        return setState((state: any) => {
            Object.keys(initialState).forEach((key)=>{
                state[key] = initialState[key]
            });
        });
    },
    ...initialState,
    // postNewUser: async () => {
    //     const userRef = ref(database, 'users'); // Reference to the 'users' table
        
    //     // Set the user data in the database
    //     set(userRef, getState().newUserData)
    //         .then(() => {
    //         console.log('User created successfully');
    //         })
    //         .catch((error) => {
    //         console.error('Error creating user:', error);
    //         });
    // },

    setUserStatus: (value: boolean) => {
        setState(produce((draft: any) => {
            draft.userStatus = value;
        }));
    },
    setUserData: (key: string, value: any) => {
        setState(produce((draft: any) => {
            draft.userData[key] = value;
        }));
    },
    setNewUserData: (key: string, value: any) => {
        setState(produce((draft: any) => {
            draft.newUserData[key] = value;
        }));
    },
    setRegisteringError: (value: string) => {
        setState(produce((draft: any) => {
            draft.registeringError = value;
        }));
    },
    setLoginError: (value: string) => {
        setState(produce((draft: any) => {
            draft.loginError = value;
        }));
    },
    setLogoutError: (value: string) => {
        setState(produce((draft: any) => {
            draft.logoutError = value;
        }));
    },
    setResetPasswordEmailError: (value: string) => {
        setState(produce((draft: any) => {
            draft.resetPasswordEmailError = value;
        }));
    },

    registerUser: async () => {
        const { email, password } = getState().newUserData;
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential: any) => {
                getState().setUserStatus(true);
                getState().setUserData('id', userCredential.user.uid);
                getState().setUserData('name', userCredential.user.displayName);
                getState().setRegisteringError('');
            })
            .catch((error: any) => {
                getState().setRegisteringError(error.messahe);
            })
    },
    loginUser: async () => {
        const { email, password } = getState().userData;
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential: any) => {
                getState().setUserStatus(true);
                getState().setUserData('id', userCredential.user.uid);
                getState().setUserData('name', userCredential.user.displayName);
                getState().setLoginError('');
            })
            .catch((error: any) => {
                console.log(error.message);
                getState().setLoginError(error.message);
            })
    },
    logoutUser: async () => {
        await signOut(auth)
            .then(() => {
                getState().setUserStatus(false);
                getState().setLogoutError('');
            })
            .catch((error: any) => {
                getState().setLogoutError(error.message);
            });
    },
    resetPassword: async () => {
        const { email } = getState().userData;
        await sendPasswordResetEmail(auth, email)
            .then(() => {
                getState().seResetPasswordEmailError('');
            })
            .catch((error: any) => {
                getState().setResetPasswordEmailError(error.message);
            });
    },
});