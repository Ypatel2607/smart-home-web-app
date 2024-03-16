import { ref, set } from 'firebase/database';
import { database } from './index';

const initialState:any = {
    users:{},
    newUserData:{ 
        userId: '',
        name: '',
        email: ''
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
    postNewUser: async () => {
        const userRef = ref(database, 'users'); // Reference to the 'users' table
        
        // Set the user data in the database
        set(userRef, getState().newUserData)
            .then(() => {
            console.log('User created successfully');
            })
            .catch((error) => {
            console.error('Error creating user:', error);
            });
    }
});