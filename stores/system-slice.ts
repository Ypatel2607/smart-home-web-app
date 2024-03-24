
export const createSystemSlice = (setState?: any, getState?: any, storeApi?: any) => ({ 
    resetGlobalState: () => {
        return (
            getState().resetUserSlice()
        )
    }
});