import React from 'react';
import useStore from '../stores';
import LoginRegister from '@/components/Users/LoginRegister';

const HomePage = () => {
    const { userStatus } = useStore(); 

    return (
        <>
            { !userStatus ? <LoginRegister /> :
                    <div>
                        <h1>Smart Home Web App</h1>
                    </div>
            }
        </>

    )
}

export default HomePage;