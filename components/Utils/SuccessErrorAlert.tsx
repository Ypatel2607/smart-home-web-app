import { Alert } from '@mui/material';
import React, { useEffect } from 'react';
import useStore from '../../stores'

const SucessErrorAlert = () => {

    const { successErrorAlert, setSuccessErrorAlert, successErrorMessage, setSuccessErrorMessage } = useStore();

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessErrorAlert('');
            setSuccessErrorMessage('');
        }, 3000)
        return () => clearTimeout(timer);
    },[successErrorAlert, successErrorMessage]);

    return (
        <>
            {successErrorAlert &&
                <Alert 
                    sx = {{ 
                        position: 'absolute', 
                        top: '100px', 
                        right: '20px', 
                        width: '200px', 
                        backgroundColor: 'white', 
                        zIndex: '100',
                        border: '1px solid',
                        borderColor: successErrorAlert === 'error' ? 'red' : 'green' }}
                    color={successErrorAlert}
                    severity={successErrorAlert}
                >
                    { successErrorMessage }
                </Alert>
            }
        </>

    )
};

export default SucessErrorAlert;