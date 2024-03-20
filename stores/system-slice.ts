
export const createSystemSlice = (setState?: any, getState?: any, storeApi?: any) => ({ 
    resetGlobalState: () => {
        getState().resetUserSlice;
    }
});

export default createSystemSlice;