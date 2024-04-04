import React from 'react';
import { Box, Button } from '@mui/material';
import useStore from '../stores'
import AddDeviceModal from '@/components/Devices/AddDeviceModal';
import DeviceTable from '@/components/Devices/DeviceTable';

const Devices = () => {

    const { addDeviceModal, setAddDeviceModal } = useStore();

    const handleAddDevice = () => {
        setAddDeviceModal(true);
    }

    const handleAddDeviceClose = () => {
        setAddDeviceModal(false);
    }

    return (
        <>
            <Box sx={{ m: 5, display: 'flex', flexDirection: 'column' }}>
                <Button variant="outlined" color="primary" onClick={handleAddDevice} sx={{ width: '15%', alignSelf: 'end' }}>
                    Add New Device
                </Button>
                <DeviceTable />
            </Box>
            <AddDeviceModal open={addDeviceModal} handleClose={handleAddDeviceClose} />
        </>

    )
}

export default Devices;