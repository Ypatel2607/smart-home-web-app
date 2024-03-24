import React from 'react';
import useStore from '../../stores';
import { Button, TextField, Typography, Box, Container } from '@mui/material';
import { validateUserData } from '@/utils/user-utils';

const RegisterUser = () => {
  const { 
    userData,  
    setUserData, 
    registerUser, 
    registeringError, 
    setRegisteringError, 
    validateUserDataError, 
    setValidateUserDataError } = useStore();
  const { name, email, password, confirmPassword } = userData;

  const handleRegister = async () => {
    setRegisteringError('');

    if(await validateUserData({ setErrors: setValidateUserDataError, name, email, password, confirmPassword})) {
      await registerUser();
    }
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <TextField
          type="text"
          label="Name"
          value={name}
          onChange={(e) => setUserData('name', e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          required
          helperText={validateUserDataError.name}
          FormHelperTextProps={{ sx: { color: 'red' } }}
        />
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setUserData('email', e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          required
          helperText={validateUserDataError.email}
          FormHelperTextProps={{ sx: { color: 'red' } }}
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setUserData('password', e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          required
          helperText={validateUserDataError.password}
          FormHelperTextProps={{ sx: { color: 'red' } }}
        />
        <TextField
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setUserData('confirmPassword', e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          required
          helperText={validateUserDataError.confirmPassword}
          FormHelperTextProps={{ sx: { color: 'red' } }}
        />
        <Button variant="contained" color="primary" onClick={handleRegister} fullWidth sx={{ my: 5 }}>
          Register
        </Button>
        {registeringError && <Typography color="error">{registeringError}</Typography>}
      </Box>
    </Container>
  );
};

export default RegisterUser;
