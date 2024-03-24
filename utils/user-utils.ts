interface validateUserDataProps {
    setErrors: any,
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export const validateUserData = async ({ setErrors, name, email, password, confirmPassword }: validateUserDataProps) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_])(?=.*[a-zA-Z_]).{8,}$/;

  let errors = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  if (!name) {
      errors = { ...errors, name: 'Name is required' };
  }

  if (!email) {
      errors = { ...errors, email: 'Email is required' };
  } else if (!emailRegex.test(email)) {
      errors = { ...errors, email: 'Email is not valid' };
  }

  if (!password) {
      errors = { ...errors, password: 'Password is required' };
  } else if (!passwordRegex.test(password)) {
      errors = { ...errors, password: 'Password should At least 8 characters long, Contains at least one digit, Contains at least one lowercase letter, Contains at least one uppercase letter, Contains at least one special character from !@#$%^&*' };
  }

  if (!confirmPassword) {
      errors = { ...errors, confirmPassword: 'Password confirmation is required' };
  } else if (password !== confirmPassword) {
      errors = { ...errors, confirmPassword: 'Password does not match' };
  }

  setErrors(errors);

  const isValid = !errors.name && !errors.email && !errors.password && !errors.confirmPassword;

  return isValid;
}

