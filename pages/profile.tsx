import { Button, Divider, Paper, Stack, TextField, Typography } from '@mui/material';
import useStore from '../stores';
import { useState } from 'react';
import { validateUserData } from '@/utils/user-utils';

const Profile = () => {
    const { 
        userData,
        validateUserDataError, 
        setValidateUserDataError, 
        updateUserName,
        updateUserPassword,
        updateProfileError,
        setUpdateProfileError } = useStore();
    const { name, email, password, confirmPassword } = userData;
    const [updatedUserData, setUpdateUserData] = useState({
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    });

    const handleUpdateProfile = async () => {
        setUpdateProfileError('name', '');
        setUpdateProfileError('password', '');

        const validateData = async () => {
            return (
                await validateUserData({  
                    setErrors: setValidateUserDataError, 
                    name: updatedUserData.name, 
                    email: updatedUserData.email, 
                    password: updatedUserData.password, 
                    confirmPassword: updatedUserData.confirmPassword})
            )
        }

        if(await validateData()) {
            await updateUserName(updatedUserData.name);
            await updateUserPassword(updatedUserData.password);
        }
    }

    return (
        <Paper elevation={3} sx={{ my: 10, mx: 20, p: 3, height: '65vh' }}>
            <Typography variant="h5" sx={{ m: 2 }} gutterBottom>
                Profile
            </Typography>
            <Divider />
            <Stack justifyContent={'space-between'} height={'85%'}>
                <Stack spacing={5} m={5}>
                    <Stack direction={'row'} spacing={20}>
                        <TextField
                            type="text"
                            label="Name"
                            value={updatedUserData.name}
                            onChange={(e) => setUpdateUserData((prevState: any) => ({ ...prevState, name: e.target.value }))}
                            variant="outlined"
                            required
                            helperText={validateUserDataError.name}
                            FormHelperTextProps={{ sx: { color: 'red' } }}
                            sx={{ width: '25%' }}
                        />
                        <TextField
                            type="email"
                            label="Email"
                            value={updatedUserData.email}
                            onChange={(e) => setUpdateUserData((prevState: any) => ({ ...prevState, email: e.target.value }))}
                            variant="outlined"
                            required
                            disabled
                            helperText={validateUserDataError.email}
                            FormHelperTextProps={{ sx: { color: 'red' } }}
                            sx={{ width: '25%' }}
                        />
                    </Stack>
                    <Stack direction={'row'} spacing={20}>
                        <TextField
                            type="password"
                            label="Password"
                            value={updatedUserData.password}
                            onChange={(e) => setUpdateUserData((prevState: any) => ({ ...prevState, password: e.target.value }))}
                            variant="outlined"
                            required
                            helperText={validateUserDataError.password || updateProfileError.password}
                            FormHelperTextProps={{ sx: { color: 'red' } }}
                            sx={{ width: '25%' }}
                            />
                            <TextField
                            type="password"
                            label="Confirm Password"
                            value={updatedUserData.confirmPassword}
                            onChange={(e) => setUpdateUserData((prevState: any) => ({ ...prevState, confirmPassword: e.target.value }))}
                            variant="outlined"
                            required
                            helperText={validateUserDataError.confirmPassword}
                            FormHelperTextProps={{ sx: { color: 'red' } }}
                            sx={{ width: '25%' }}
                            />
                    </Stack>
                </Stack>
                <Stack direction={'row'} spacing={20} m={5} justifyContent={'space-between'}>
                    <Button variant="outlined" color="error" onClick={() => {}} sx={{ width: '20%' }}>
                        Delete Account
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleUpdateProfile} sx={{ width: '20%' }}>
                        Update Profile
                    </Button>
                </Stack>
            </Stack>
            
        </Paper>
    )
};

export default Profile;