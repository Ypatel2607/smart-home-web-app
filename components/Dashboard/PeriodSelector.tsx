import { FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import React from 'react';

interface PeriodSelectorProps {
    loading: boolean,
    label: string,
    value: string,
    onChange: any,
    options: {},
    dates: any,
    analytics?: boolean
}

const PeriodSelector = ({ 
    loading,
    label,
    value,
    onChange,
    options,
    dates,
    analytics=false }: PeriodSelectorProps) => {

    return (
        <Stack mx={'3vw'} spacing={0.5}>
            <FormControl sx={{ minWidth: '250px', width: '27vw', backgroundColor: 'white' }}>
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
                        <MenuItem key={value} value={value}>{analytics ? name.label : name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {analytics ? 
                    <>
                        <Typography variant={'body2'} sx={{ px: 1 }}>
                            { `This period dates: ${dates.currentDates.startDate} to ${dates.currentDates.endDate}` }
                        </Typography>
                        <Typography variant={'body2'} sx={{ px: 1 }}>
                            { `Last Period dates: ${dates.comparisonDates.startDate} to ${dates.comparisonDates.endDate}` }
                            </Typography>
                    </>
                : 
                    <Typography variant={'body2'} sx={{ px: 1 }}>{ `dates: ${dates.startDate} to ${dates.endDate}` }</Typography>
            }
            
        </Stack>
    )
};

export default PeriodSelector;