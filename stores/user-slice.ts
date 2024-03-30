import { auth } from './index';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendPasswordResetEmail, 
    updateProfile, 
    updatePassword } from 'firebase/auth';
import { produce } from 'immer';

const initialState: any = {
    userStatus: false,
    userData: {
        id: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    },
    registeringError: '',
    loginError: '',
    logoutError: '',
    resetPasswordErrorEmail: '',
    updateProfileError: {
        name: '',
        password: ''
    },
    validateUserDataError: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
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
    setValidateUserDataError: (value: any) => {
        setState(produce((draft: any) => {
            draft.validateUserDataError = value;
        }));
    },
    setUpdateProfileError: (key: string, value: any) => {
        setState(produce((draft: any) => {
            draft.updateProfileError[key] = value;
        }));
    },

    registerUser: async () => {
        const { name, email, password } = getState().userData;
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential: any) => {
                getState().setUserStatus(true);
                getState().setUserData('id', userCredential.user.uid);
                getState().setRegisteringError('');
                
                //@ts-ignore
                updateProfile(auth.currentUser, {
                    displayName: name
                }).catch((error: any) => {
                    getState().setRegisteringError(error.message);
                })
            })
            .catch((error: any) => {
                getState().setRegisteringError(error.message);
            })
    },
    loginUser: async () => {
        const { email, password } = getState().userData;
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential: any) => {
                console.log(userCredential);
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
                getState().setResetPasswordEmailError('');
            })
            .catch((error: any) => {
                getState().setResetPasswordEmailError(error.message);
            });
    },
    updateUserName: async (name: string) => {
        //@ts-ignore
        await updateProfile(auth.currentUser, { displayName: name})
            .then(() => {
                getState().setUserData('name', name);
                getState().setUpdateProfileError('name', '');
            }).catch((error: any) => {
                getState().setUpdateProfileError('name', error.message);
            })
    },
    updateUserPassword: async (password: string) => {
        //@ts-ignore
        await updatePassword(auth.currentUser, password)
            .then(() => {
                getState().setUserData('password', password);
                getState().setUpdateProfileError('password', '');
            }).catch((error: any) => {
                getState().setUpdateProfileError('password', error.message);
            })
    }
});