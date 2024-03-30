interface validateNewDeviceDataProps {
    setErrors: any,
    name: string,
    type: string,
}

export const validateNewDeviceData = async ({ setErrors, name, type }: validateNewDeviceDataProps) => {
  let errors = {
    name: '',
    type: '',
  };

  if (!name) {
      errors = { ...errors, name: 'Name is required' };
  }

  if (!type) {
      errors = { ...errors, type: 'Type is required' };
  }

  setErrors(errors);

  const isValid = !errors.name && !errors.type

  return isValid;
}