import { onValue, ref } from 'firebase/database';
import { database } from './index';
import { produce } from 'immer';

const initialState: any = {  
    notificationsLoading: false, 
    notifications: []
}

export const createNotificationSlice = (setState?: any, getState?: any, storeApi?: any) => ({
    resetNotificationSlice: () => {
        return setState((state: any) => {
            Object.keys(initialState).forEach((key)=>{
                state[key] = initialState[key]
            });
        });
    },
    ...initialState,

    setNotificationsLoading: (value: boolean) => {
        setState(produce((draft: any) => {
            draft.notificationsLoading = value;
        }));
    },
    setNotifications: (value: any[]) => {
        setState(produce((draft: any) => {
            draft.notifications = value;
        }));
    },


    getNotifications: async () => {
        getState().setNotificationsLoading(true)
        const notificationRef = ref(database, `${getState().userData.id}/notifications`);
        
        onValue(notificationRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert object to array of objects
                const dataArray = Object.entries(data).map(([date, content]) => ({ date, content }));
                
                // Sort array by date
                const sortedData = dataArray.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB.getTime() - dateA.getTime();
                });
    
                getState().setNotifications(sortedData);
            } else {
                getState().setNotifications([]);
            }
            getState().setNotificationsLoading(false);
        }, { onlyOnce: true });
    }

})