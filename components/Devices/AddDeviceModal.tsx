import { Button, Container, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useStore from '../../stores'
import { validateNewDeviceData } from '@/utils/device-utils';
import CloseIcon from '@mui/icons-material/Close';
import { DEVICE_TYPES } from '@/utils/constants';

interface AddDeviceModalProps {
    open: boolean,
    handleClose: () => void
}

const AddDeviceModal = ({ open, handleClose }: AddDeviceModalProps) => {

    const { 
        postNewDevice, 
        newDeviceData, 
        setNewDeviceData, 
        validateDeviceDataError, 
        setValidateDeviceDataError, 
        getDevices } = useStore();
    const { name, type, manufacturer, model } = newDeviceData;

    const handleAddDeviceClick = async () => {
        const validateData = async () => {
            return (
                await validateNewDeviceData({  
                    setErrors: setValidateDeviceDataError, 
                    name: newDeviceData.name, 
                    type: newDeviceData.type })
            )
        }

        if(await validateData()) {
            await postNewDevice();
            await getDevices();
            handleClose();
        }
    }

    return (
        <Modal
            open={open}
            aria-labelledby="add-new-device"
            aria-describedby="add-new-device"
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
                    <IconButton 
                        onClick={() => {
                            handleClose();             
                            setValidateDeviceDataError({
                                name: '',
                                type: '',
                            })
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                <Typography variant="h5" gutterBottom display={'flex'} justifyContent={'center'} mt={1} mb={2}>
                    {'Add Device Information'}
                </Typography>
                <Stack my={1} direction={'row'} justifyContent={'space-between'} width={'80%'}>
                    <TextField
                        type="text"
                        label="Name"
                        value={name}
                        onChange={(e) => setNewDeviceData('name', e.target.value)}
                        variant="outlined"
                        sx={{ width: '45%', mt: 2, mb: 1 }}
                        margin="normal"
                        required
                        helperText={validateDeviceDataError.name}
                        FormHelperTextProps={{ sx: { color: 'red' } }}
                    />
                    <FormControl sx={{ mt: 2, mb: 1, width: '45%', height: '80%' }}>
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            labelId="type-label"
                            id="type-select"
                            value={type}
                            onChange={(e) => setNewDeviceData('type', e.target.value)}
                            label="Type"
                            required
                        >
                            {Object.entries(DEVICE_TYPES).map(([value, label]) => (
                                <MenuItem key={value} value={value}>{label}</MenuItem>
                            ))}
                        </Select>
                        {validateDeviceDataError.type && <Typography variant={'subtitle1'} color="error">{validateDeviceDataError.type}</Typography>}
                    </FormControl>
                </Stack>
                <Stack my={1} direction={'row'} justifyContent={'space-between'} width={'80%'}>
                    <TextField
                        type="text"
                        label="Manufacturer"
                        value={manufacturer}
                        onChange={(e) => setNewDeviceData('manufacturer', e.target.value)}
                        variant="outlined"
                        sx={{ width: '45%' }}
                        margin="normal"
                    />
                    <TextField
                        type="text"
                        label="Model"
                        value={model}
                        onChange={(e) => setNewDeviceData('model', e.target.value)}
                        variant="outlined"
                        sx={{ width: '45%' }}
                        margin="normal"
                    />
                </Stack>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleAddDeviceClick} 
                    sx={{ mt: 4, width: '25%' }}
                >
                    {'Add Device'}
                </Button>
            </Container>
        </Modal>
    )
};

export default AddDeviceModal;