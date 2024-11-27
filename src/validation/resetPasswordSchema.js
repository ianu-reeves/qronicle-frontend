import * as yup from 'yup';

export const resetPasswordSchema =  yup.object().shape({
    newPassword: yup
      .string()
      .trim()
      .min(10, 'Password must be at least 10 characters')
      .max(50, 'Password cannot be more than 50 characters')
      .required('This field cannot be left blank'),
    confirmNewPassword: yup
      .string()
      .trim()
      .oneOf([yup.ref('newPassword')], 'Passwords do not match')
      .required('You must confirm your new password')
  });
