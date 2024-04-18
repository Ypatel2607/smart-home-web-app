import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';
import React, { useEffect } from 'react';
import useStore from '../../stores';

const DeviceSelector = () => {

    const {         
        getDevices,
        deviceData,
        deviceDataLoading,
        devices,
        setDevices } = useStore();

    useEffect(() => {
        getDevices();
    },[])

    const DEVICE_DATA = () => {
        const data: { [key: string]: string } = {};
        deviceData.forEach((device: any) => {
            data[device.key] = device.name;
        });
        return data;
    }

    const handleDeviceChange = (e: any) => {
        setDevices(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value);
    };

    return (
        <FormControl sx={{ minWidth: '250px', width: '27vw', height: '80%', mx: '3vw', backgroundColor: 'white' }}>
            <InputLabel id="select-multiple-devices-label">Select Device(s)</InputLabel>
            <Select
                labelId="select-multiple-devices-label"
                id="select-multiple-devices"
                multiple
                disabled={deviceDataLoading}
                value={devices}
                onChange={(e: any) => handleDeviceChange(e)}
                input={<OutlinedInput label="Select Device(s)" />}
                renderValue={(selected) => selected.map((val: any) => DEVICE_DATA()[val]).join(', ')}
            >
                {Object.entries(DEVICE_DATA()).map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                        <Checkbox checked={devices.includes(value)} />
                        <ListItemText primary={label} />
                    </MenuItem>
                ))}
            </Select>
      </FormControl>
    )
};

export default DeviceSelector;