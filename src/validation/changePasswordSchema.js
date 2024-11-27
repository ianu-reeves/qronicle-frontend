import * as yup from 'yup';

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required('You must enter your old password to proceed'),
  newPassword: yup
    .string()
    .trim()
    .min(10)
    .max(50)
    .required('You must choose a new password'),
  matchingNewPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('newPassword')], 'Passwords do not match')
    .required('You must confirm your new password')
});
