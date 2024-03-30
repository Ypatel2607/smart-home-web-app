import { DataGrid, GridCellParams, GridColDef, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState,  } from 'react';
import useStore from '../../stores';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import RemoveDeviceModal from './RemoveDeviceModal';

const DeviceTable = () => {

    const { getDevices, deviceData, deviceDataLoading, removeDeviceModal, setRemoveDeviceModal } = useStore();
    const [removeDeviceData, setRemoveDeviceData] = useState();

    useEffect(() => {
        getDevices();
    }, [])

    const handleRemoveDeviceOpen = (data: any) => {
        setRemoveDeviceModal(true);
        setRemoveDeviceData(data);
    }

    const handleRemoveDeviceClose = () => {
        setRemoveDeviceModal(false);
    }

    const columns: GridColDef[] = [
        { field: 'key', headerName: 'Device ID', flex: 1 }, 
        { field: 'name', headerName: 'Device Name', flex: 1 }, 
        { field: 'type', headerName: 'Device Type',flex: 1 },
        { field: 'manufacturer', headerName: 'Device Manufacturer', flex: 1 }, 
        { field: 'model', headerName: 'Device Model', flex: 0.75 },
        { 
            field: 'delete', 
            headerName: '', 
            flex: 0.25, 
            renderCell: (params: GridCellParams) => {
                const { row } = params
                return (
                    <IconButton onClick={() => handleRemoveDeviceOpen(row)}>
                        <DeleteIcon />
                    </IconButton>
                )
            }
        }
    ]

    const rows: GridRowsProp = deviceData;

    return (
        <>
            <DataGrid
                autoHeight
                getRowId={(row) => row.key}
                columns={columns}
                rows={rows}
                pagination
                initialState={{
                    pagination: {
                      paginationModel: { pageSize: 10, page: 0 },
                    },
                  }}
                pageSizeOptions={[10,25,100]}
                loading={deviceDataLoading}
                slots={{ toolbar: GridToolbar }}
                sx={{ my: 5, minHeight: '65vh', backgroundColor: 'white' }}
            />
            <RemoveDeviceModal open={removeDeviceModal} handleClose={handleRemoveDeviceClose} removeDeviceData={removeDeviceData} />
        </>
    )
};

export default DeviceTable;