import { produce } from "immer";

const initialState: any = {
    successErrorAlert: '',
    successErrorMessage: ''
}

export const createSystemSlice = (setState?: any, getState?: any, storeApi?: any) => ({ 
    resetSystemSlice: () => {
        return setState((state: any) => {
            Object.keys(initialState).forEach((key)=>{
                state[key] = initialState[key]
            });
        });
    },
    ...initialState,

    setSuccessErrorAlert: (value: boolean) => {
        setState(produce((draft: any) => {
            draft.successErrorAlert = value;
        }));
    },
    setSuccessErrorMessage: (value: boolean) => {
        setState(produce((draft: any) => {
            draft.successErrorMessage = value;
        }));
    },

    resetGlobalState: () => {
        return (
            getState().resetSystemSlice(),
            getState().resetUserSlice(),
            getState().resetDeviceSlice(),
            getState().resetDataSlice(),
            getState().resetNotificationSlice()
        )
    }
});