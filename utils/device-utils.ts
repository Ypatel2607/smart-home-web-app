interface validateNewDeviceDataProps {
    setErrors: any,
    name: string,
    type: string,
    electricConsumption: number
}

export const validateNewDeviceData = async ({ setErrors, name, type, electricConsumption }: validateNewDeviceDataProps) => {
    let errors = {
        name: '',
        type: '',
        electricConsumption: ''
    };

    if (!name) {
        errors = { ...errors, name: 'Name is required' };
    }

    if (!type) {
        errors = { ...errors, type: 'Type is required' };
    }

    if (!electricConsumption) {
        errors = { ...errors, electricConsumption: 'Electric Consumption is required' };    
    }

    setErrors(errors);

    const isValid = !errors.name && !errors.type && !errors.electricConsumption

    return isValid;
}