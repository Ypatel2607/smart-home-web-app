import { DataGrid, GridCellParams, GridColDef, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState,  } from 'react';
import useStore from '../../stores';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { FormControlLabel, IconButton, Switch } from '@mui/material';
import RemoveDeviceModal from './RemoveDeviceModal';
import { DEVICE_TYPES } from '@/utils/constants';
import EditDeviceModal from './EditDeviceModal';

const DeviceTable = () => {

    const { 
        getDevices, 
        deviceData, 
        deviceDataLoading, 
        editDeviceModal, 
        setEditDeviceModal,
        removeDeviceModal, 
        setRemoveDeviceModal } = useStore();
    const [editDeviceData, setEditDeviceData] = useState();
    const [removeDeviceData, setRemoveDeviceData] = useState();

    useEffect(() => {
        getDevices();
    }, [])

    const handleEditDeviceOpen = (data: any) => {
        setEditDeviceModal(true);
        setEditDeviceData(data);
    }

    const handleEditDeviceClose = () => {
        setEditDeviceModal(false);
    }

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
        { 
            field: 'type', 
            headerName: 'Device Type', 
            flex: 1,
            renderCell: (params: GridCellParams) => {
                const { row } = params
                return(
                    <>{ //@ts-ignore
                            DEVICE_TYPES[row.type] 
                    }</>
                )
            } 
        },
        { field: 'manufacturer', headerName: 'Device Manufacturer', flex: 1 }, 
        { field: 'model', headerName: 'Device Model', flex: 0.8 },
        { field: 'electricConsumption', headerName: 'Electric Consumpotion (kW/h)', flex: 1.1 },
        { 
            field: 'status', 
            headerName: 'Device Status', 
            flex: 0.6, 
            renderCell: (params: GridCellParams) => {
                const { row } = params
                return (
                    <>{ row.status ? 'on' : 'off' } </>
                )
            }
        },
        { 
            field: 'edit-delete', 
            headerName: '', 
            flex: 0.5, 
            renderCell: (params: GridCellParams) => {
                const { row } = params
                return (
                    <>
                    <IconButton onClick={() => handleEditDeviceOpen(row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleRemoveDeviceOpen(row)}>
                        <DeleteIcon />
                    </IconButton>
                    </>
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
            <EditDeviceModal open={editDeviceModal} handleClose={handleEditDeviceClose} editDeviceData={editDeviceData} />
            <RemoveDeviceModal open={removeDeviceModal} handleClose={handleRemoveDeviceClose} removeDeviceData={removeDeviceData} />
        </>
    )
};

export default DeviceTable;