import { Button, Container, IconButton, Modal, Stack, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import useStore from '../../stores'

interface RemoveDeviceModalProps {
    open: boolean,
    handleClose: () => void,
    removeDeviceData: any
}

const RemoveDeviceModal = ({ open, handleClose, removeDeviceData }: RemoveDeviceModalProps) => {

    const { removeDevice, getDevices } = useStore();

    const handleRemoveDevice = async () => {
        console.log(removeDeviceData);
        if(Object.entries(removeDeviceData).length) {
            await removeDevice(removeDeviceData.key);
            await getDevices();
            handleClose();
        }
    }

    return (
        <Modal
            open={open}
            aria-labelledby="remove-device"
            aria-describedby="remove-device"
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
                        {'Remove Device'}
                    </Typography>
                    <Typography variant="h6" gutterBottom display={'flex'} justifyContent={'center'} mt={1} mb={3}>
                        {`Are you sure you want to remove below device?`}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom display={'flex'} justifyContent={'center'} mt={1}>
                        {`Device ID :  ${removeDeviceData?.key}`}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom display={'flex'} justifyContent={'center'}>
                        {`Device Name :  ${removeDeviceData?.name}`}
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
                            color="primary" 
                            onClick={handleRemoveDevice} 
                            sx={{ width: '25%' }}
                        >
                            {'remove Device'}
                        </Button>
                    </Stack>
            </Container>
        </Modal>
    )
};

export default RemoveDeviceModal;