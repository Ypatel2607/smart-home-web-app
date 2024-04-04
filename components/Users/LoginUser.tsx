import React, { useState } from 'react';
import useStore from '../../stores';
import { Button, TextField, Typography, Box, Container, Stack } from '@mui/material';

const LoginUser = () => {
    const { userData, setUserData, loginUser, loginError, resetPasswordEmail, resetPasswordErrorEmail } = useStore();
    const { email, password } = userData;
    const [forgotPassword, setForgotPassword] = useState(false);

    const handleLogin = async () => {
        await loginUser();
    };

    const handleForgotPassword = async () => {
      await resetPasswordEmail();
    }

    const loginView = () => {
      return (
        <>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setUserData('email', e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setUserData('password', e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Typography 
              variant={'subtitle1'} 
              color={'blue'} 
              sx={{ textDecoration: 'underline', my: 1, cursor: 'pointer' }} 
              onClick={() => setForgotPassword(true)}
            >
              Forgot Password?
            </Typography>
            <Button variant="contained" color="primary" onClick={handleLogin} fullWidth sx={{ my: 3 }}>
              Login
            </Button>
            {loginError && <Typography color="error">{loginError}</Typography>}
        </>
      )
    }

    const forgotPasswordView = () => {
      return (
        <>
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setUserData('email', e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Stack direction={'row'}  sx={{ my: 5 }} spacing={5}>
              <Button variant="contained" color="primary" onClick={handleForgotPassword}>
                Send Email
              </Button>
              <Button variant="contained" color="primary" onClick={() => setForgotPassword(false)}>
                Cancel
              </Button>
            </Stack>
            {resetPasswordErrorEmail && <Typography color="error">{resetPasswordErrorEmail}</Typography>}
        </>
      )
    }

    return (
        <Container maxWidth="xs">
          <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            { !forgotPassword ? loginView() : forgotPasswordView() }
          </Box>
        </Container>
      );
};

export default LoginUser;
