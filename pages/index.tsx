import React, { useEffect, useState } from 'react';
import useStore from '../stores';
import LoginRegister from '@/components/Users/LoginRegister';
import Dashboard from '@/components/Dashboard/Dashboard';


const HomePage = () => {
    const { userStatus, resetGlobalState } = useStore(); 
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    return (
        <>
            { domLoaded && (!userStatus ? <LoginRegister /> : <Dashboard />) }
        </>
    )
}

export default HomePage;