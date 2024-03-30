import { 
    Button, 
    CircularProgress, 
    Container, 
    FormControl, 
    FormControlLabel, 
    IconButton, 
    InputLabel, 
    MenuItem, 
    Modal, 
    Select, 
    Stack, 
    Switch, 
    TextField, 
    Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useStore from '../../stores'
import { validateNewDeviceData } from '@/utils/device-utils';
import CloseIcon from '@mui/icons-material/Close';
import { DEVICE_TYPES } from '@/utils/constants';

interface AddDeviceModalProps {
    open: boolean,
    handleClose: () => void,
    editDeviceData: any
}

const EditDeviceModal = ({ open, handleClose, editDeviceData }: AddDeviceModalProps) => {

    const { 
        editDevice,
        validateDeviceDataError, 
        setValidateDeviceDataError, 
        getDevices } = useStore();
    const [deviceData, setDeviceData] = useState(editDeviceData);
    
    useEffect(() => {
        setDeviceData(editDeviceData);
    }, [editDeviceData]);

    const handleEditDeviceClick = async () => {
        const validateData = async () => {
            return (
                await validateNewDeviceData({  
                    setErrors: setValidateDeviceDataError, 
                    name: deviceData.name, 
                    type: deviceData.type })
            )
        }

        if(await validateData()) {
            await editDevice(deviceData);
            await getDevices();
            handleClose();
        }
    }

    return (
        <Modal
            open={open}
            aria-labelledby="edit-device"
            aria-describedby="edit-device"
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
                <Typography variant="h5" gutterBottom display={'flex'} justifyContent={'center'} m={1}>
                    {'Update Device Information'}
                </Typography>
                { deviceData === undefined ? 
                    <CircularProgress />
                    :
                    <>
                        <Stack my={1} direction={'row'} justifyContent={'space-between'} width={'80%'}>
                            <TextField
                                type="text"
                                label="Name"
                                value={deviceData?.name}
                                onChange={(e) => setDeviceData({ ...deviceData, 'name': e.target.value })}
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
                                    value={deviceData?.type}
                                    onChange={(e) => setDeviceData({ ...deviceData, 'type': e.target.value })}
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
                        <Stack direction={'row'} justifyContent={'space-between'} width={'80%'}>
                            <TextField
                                type="text"
                                label="Manufacturer"
                                value={deviceData?.manufacturer}
                                onChange={(e) => setDeviceData({ ...deviceData, 'manufacturer': e.target.value })}
                                variant="outlined"
                                sx={{ width: '45%' }}
                                margin="normal"
                            />
                            <TextField
                                type="text"
                                label="Model"
                                value={deviceData?.model}
                                onChange={(e) => setDeviceData({ ...deviceData, 'model': e.target.value })}
                                variant="outlined"
                                sx={{ width: '45%' }}
                                margin="normal"
                            />
                        </Stack>
                        <FormControlLabel 
                            control={
                                <Switch 
                                    checked={deviceData?.status}
                                    onChange={(e) => setDeviceData({ ...deviceData, 'status': e.target.checked })}
                                />
                            } 
                            label={ deviceData?.status ? 'on' : 'off' } 
                        />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleEditDeviceClick} 
                            sx={{ mt: 4, width: '25%' }}
                        >
                            {'Edit Device'}
                        </Button>
                    </>
                }
            </Container>
        </Modal>
    )
};

export default EditDeviceModal;