import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React from 'react';

interface DimensionSelectorProps {
    loading: boolean,
    label: string,
    value: string,
    onChange: any,
    options: {},
}

const DimensionSelector = ({ 
    loading,
    label,
    value,
    onChange,
    options }: DimensionSelectorProps) => {

    return (
        <FormControl sx={{ minWidth: '250px', width: '27vw', mx: '3vw', height: '80%', backgroundColor: 'white' }}>
            <InputLabel id="type-label">{label}</InputLabel>
            <Select                                    
                labelId="type-label"
                id="type-select"
                value={value}
                onChange={(e) => {onChange(e)}}
                label={label}
                disabled={loading}
            >
                {Object.keys(options).length && Object.entries(options).map(([value, name]) => (
                    //@ts-ignore
                    <MenuItem key={value} value={value}>{name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
};

export default DimensionSelector;