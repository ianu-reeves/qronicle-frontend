import * as yup from 'yup';

export const editProfileSchema =() => {
  return yup.object().shape({
    firstName: yup
      .string().trim()
      .max(50, 'First name must be 50 characters or less')
      .required('First name is required'),
    lastName: yup
      .string().trim(),
  });
};
