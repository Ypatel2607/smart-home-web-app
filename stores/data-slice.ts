import { onValue, ref } from 'firebase/database';
import { database } from './index';
import { produce } from 'immer';
import { getPeriodDates } from '@/utils/data-utils';

const initialState: any = {    
    electricConsumptionDataLoading: false,
    electricConsumptionData: {},
    usageDataLoading: false,
    usageData: {},
    currentPeriod: 'this_week',
    currentDates: getPeriodDates('this_week'),
    comparisonPeriod: 'last_week',
    comparisonDates: getPeriodDates('last_week'),
    devices: [],
    analyticsPeriod: 'this_week_vs_last_week',
    analyticsDates: {
        currentDates: getPeriodDates('this_week'),
        comparisonDates: getPeriodDates('last_week')
    },
    dimension: 'electricData'
}

export const createDataSlice = (setState?: any, getState?: any, storeApi?: any) => ({
    resetDataSlice: () => {
        return setState((state: any) => {
            Object.keys(initialState).forEach((key)=>{
                state[key] = initialState[key]
            });
        });
    },
    ...initialState,

    setElectricConsumptionDataLoading: (value: boolean) => {
        setState(produce((draft: any) => {
            draft.electricConsumptionDataLoading = value;
        }));
    },
    setElectricConsumptionData: (value: any) => {
        setState(produce((draft: any) => {
            draft.electricConsumptionData = value;
        }));
    },
    setUsageDataLoading: (value: boolean) => {
        setState(produce((draft: any) => {
            draft.usageDataLoading = value;
        }));
    },
    setUsageData: (value: any) => {
        setState(produce((draft: any) => {
            draft.usageData = value;
        }));
    },

    setCurrentPeriod: (value: any) => {
        setState(produce((draft: any) => {
            draft.currentPeriod = value;
        }));
    },
    setCurrentDates: (value: any) => {
        setState(produce((draft: any) => {
            draft.currentDates = value;
        }));
    },
    setComparisonPeriod: (value: any) => {
        setState(produce((draft: any) => {
            draft.comparisonPeriod = value;
        }));
    },
    setComparisonDates: (value: any) => {
        setState(produce((draft: any) => {
            draft.comparisonDates = value;
        }));
    },
    setDevices: (value: any) => {
        setState(produce((draft: any) => {
            draft.devices = value;
        }));
    },
    setAnalyticsPeriod: (value: any) => {
        setState(produce((draft: any) => {
            draft.analyticsPeriod = value;
        }));
    },
    setAnalyticsDates: (value: any) => {
        setState(produce((draft: any) => {
            draft.analyticsDates = value;
        }));
    },
    setDimension: (value: any) => {
        setState(produce((draft: any) => {
            draft.dimension = value;
        }));
    },

    getElectricConsumptionData: async() => {
        getState().setElectricConsumptionDataLoading(true)
        const electricConsumptionDataRef = ref(database, `${getState().userData.id}/electricConsumptionData`);
        
        onValue(electricConsumptionDataRef, (snapshot) => {
            const data = snapshot.val();
            getState().setElectricConsumptionData(data || {});
            getState().setElectricConsumptionDataLoading(false);
        }, { onlyOnce: true });
    },
    getUsageData: async() => {
        getState().setUsageDataLoading(true)
        const usageDataRef = ref(database, `${getState().userData.id}/usageData`);
        
        onValue(usageDataRef, (snapshot) => {
            const data = snapshot.val();
            getState().setUsageData(data || {});
            getState().setUsageDataLoading(false);
        }, { onlyOnce: true });
    }
})