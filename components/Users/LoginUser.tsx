import React from 'react';
import useStore from '../../stores';
import router from 'next/router';

const LoginUser = () => {
    const { userData, setUserData, loginUser, loginError } = useStore();
    const { id, name, email, password } = userData;

    const handleLogin = async () => {
        await loginUser();
        router.push('/');
    };

    return (
        <div>
        <h2>Login</h2>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setUserData('email',e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setUserData('password',e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {loginError && <p>{ loginError }</p>}
        </div>
    );
};

export default LoginUser;
