import { Button, Container, IconButton, Modal, Stack, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import useStore from '../../stores';
import router from 'next/router';

interface DeleteAccountModalProps {
    open: boolean,
    handleClose: () => void,
}

const DeleteAccountModal = ({ open, handleClose }: DeleteAccountModalProps) => {

    const { deleteUser, resetGlobalState } = useStore();

    const handleRemoveAccount = async () => {
        await deleteUser();
        resetGlobalState(); 
        router.push('/');
    }

    return(
        <Modal
            open={open}
            aria-labelledby="remove-account"
            aria-describedby="remove-account"
        >
            <Container 
                sx={{ 
                    backgroundColor: 'white', 
                    width: '50%', 
                    height: '50%', 
                    position: 'absolute', 
                    top: '25%', 
                    left: '25%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center' }}
            >
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '8px' }}>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Typography variant="h5" gutterBottom display={'flex'} justifyContent={'center'} mt={1} mb={3}>
                    {'Delete Account'}
                </Typography>
                <Typography variant="h6" gutterBottom display={'flex'} justifyContent={'center'} mt={1} mb={3}>
                    {`Are you sure you want to Delete your account?`}
                </Typography>
                <Stack direction={'row'} spacing={10} justifyContent={'center'} width={'100%'} mt={5}>
                        <Button 
                            variant="outlined" 
                            color="secondary" 
                            onClick={handleClose} 
                            sx={{ width: '25%' }}
                        >
                            {'Cancel'}
                        </Button>
                        <Button 
                            variant="contained" 
                            color="warning" 
                            onClick={handleRemoveAccount} 
                            sx={{ width: '25%' }}
                        >
                            {'Delete Account'}
                        </Button>
                    </Stack>
            </Container>
        </Modal>
    )
};

export default DeleteAccountModal;