import React from 'react';
import useStore from '../../stores';
import router from 'next/router';

const RegisterUser = () => {
      const { newUserData, registerUser, setNewUserData } = useStore();
      const { name, email, password, confirmPassword } = newUserData;

  const handleRegister = async () => {
    try {
      await registerUser();
      router.push('/login');
    } catch (error) {
      console.error('Error registering user:', error);
  }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setNewUserData('email',e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setNewUserData('password',e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterUser;
