import { onValue, push, ref, remove, set, update } from 'firebase/database';
import { database } from './index';
import { produce } from 'immer';

const initialState: any = {
    newDeviceData: {
        name: '',
        type: '',
        manufacturer: '',
        model: '',
        status: false,
        electricConsumption: 0
    },
    addDeviceModal: false,
    editDeviceModal: false,
    removeDeviceModal: false,
    validateDeviceDataError: {
        name: '',
        type: '',
        electricConsumption: ''
    },
    deviceData: [],
    deviceDataLoading: false
}

export const createDeviceSlice = (setState?: any, getState?: any, storeApi?: any) => ({
    resetDeviceSlice: () => {
        return setState((state: any) => {
            Object.keys(initialState).forEach((key)=>{
                state[key] = initialState[key]
            });
        });
    },
    ...initialState,

    setNewDeviceData: (key: string, value: any) => {
        setState(produce((draft: any) => {
            draft.newDeviceData[key] = value;
        }));
    },
    setAddDeviceModal: (value: boolean) => {
        setState(produce((draft: any) => {
            draft.addDeviceModal = value;
        }));
    },
    setEditDeviceModal: (value: boolean) => {
        setState(produce((draft: any) => {
            draft.editDeviceModal = value;
        }));
    },
    setRemoveDeviceModal: (value: boolean) => {
        setState(produce((draft: any) => {
            draft.removeDeviceModal = value;
        }));
    },
    resetNewDeviceData: () => {
        return setState((state: any) => {
            Object.keys(initialState.newDeviceData).forEach((key)=>{
                state.newDeviceData[key] = initialState.newDeviceData[key]
            });
        });
    },
    setValidateDeviceDataError: (value: any) => {
        setState(produce((draft: any) => {
            draft.validateDeviceDataError = value;
        }));
    },
    setDeviceData: (value: any[]) => {
        setState(produce((draft: any) => {
            draft.deviceData = value;
        }));
    },
    setDeviceDataLoading: (value: boolean) => {
        setState(produce((draft: any) => {
            draft.deviceDataLoading = value;
        }));
    },

    postNewDevice: async () => {
        const deviceRef = ref(database, `${getState().userData.id}/devices`);
        const newDeviceRef = push(deviceRef);
        set(newDeviceRef, getState().newDeviceData)
            .then(() => {
                getState().resetNewDeviceData();
                getState().setSuccessErrorAlert('success');
                getState().setSuccessErrorMessage('Device successfully added.')
            })
            .catch((error) => {
                getState().setSuccessErrorAlert('error');
                getState().setSuccessErrorMessage('Some error occur adding device.');
            });
    },
    getDevices: async () => {
        getState().setDeviceDataLoading(true)
        const deviceRef = ref(database, `${getState().userData.id}/devices`);
        
        onValue(deviceRef, (snapshot) => {
            //@ts-ignore
            const data = Object.entries(snapshot.val() || {})?.map(([key, value]) => ({ key, ...value }));
            getState().setDeviceData(data);
            getState().setDeviceDataLoading(false);
        }, { onlyOnce: true });
    },
    editDevice: async (deviceData: any) => {
        const { key, ...updatedData } = deviceData;
        const deviceRef = ref(database, `${getState().userData.id}/devices/${key}`);
        try {
            await update(deviceRef, updatedData);
            getState().setSuccessErrorAlert('success');
            getState().setSuccessErrorMessage('Device successfully updated.');
        } catch (error) {
            getState().setSuccessErrorAlert('error');
            getState().setSuccessErrorMessage('Some error occurred while updating device.');
        }
    },
    removeDevice: async (key: string) => {
        const deviceRef = ref(database, `${getState().userData.id}/devices/${key}`);
        try {
            await remove(deviceRef);
            getState().setSuccessErrorAlert('success');
            getState().setSuccessErrorMessage('Device successfully removed.')
        } catch (error) {
            getState().setSuccessErrorAlert('error');
            getState().setSuccessErrorMessage('Some error occur removing device.');
        }
    }
});