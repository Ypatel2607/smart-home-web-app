import React, { useState } from 'react';
import { Button, Typography, Box, Container } from '@mui/material';
import LoginUser from '@/components/Users/LoginUser';
import RegisterUser from '@/components/Users/RegisterUser';

const LoginRegister = () => {
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);

    return (
        <Container maxWidth="xs">
          <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {login ? (
              <LoginUser />
            ) : register ? (
              <RegisterUser />
            ) : (
              <>
                <Typography variant="h5" gutterBottom>
                  Welcome!
                </Typography>
                <Button variant="contained" onClick={() => setLogin(true)} sx={{ my: 1 }}>
                  Login
                </Button>
                <Button variant="contained" onClick={() => setRegister(true)} sx={{ my: 1 }}>
                  Register
                </Button>
              </>
            )}
          </Box>
        </Container>
      );
};

export default LoginRegister;