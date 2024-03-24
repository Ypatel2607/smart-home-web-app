import React from 'react';
import useStore from '../../stores';
import router from 'next/router';
import { Button, TextField, Typography, Box, Container } from '@mui/material';

const LoginUser = () => {
    const { userData, setUserData, loginUser, loginError } = useStore();
    const { id, name, email, password } = userData;

    const handleLogin = async () => {
        await loginUser();
    };

    return (
        <Container maxWidth="xs">
          <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            <Button variant="contained" color="primary" onClick={handleLogin} fullWidth sx={{ my: 5 }}>
              Login
            </Button>
            {loginError && <Typography color="error">{loginError}</Typography>}
          </Box>
        </Container>
      );
};

export default LoginUser;
