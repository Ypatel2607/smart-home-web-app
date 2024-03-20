import LoginUser from '@/components/Users/LoginUser';
import RegisterUser from '@/components/Users/RegisterUser';
import React, { useEffect, useState } from 'react';
import useStore from '../../stores';
import router from 'next/router';

const LoginRegister = () => {
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);

    return (
        <>
            { login ? <LoginUser /> :
                register ? <RegisterUser /> :
                <>
                    <button onClick={() => setLogin(true)}>Login</button>
                    <button onClick={() => setRegister(true)}>Register</button>
                </>
            }
        </>

    )
}

export default LoginRegister;