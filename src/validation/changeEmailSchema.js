import * as yup from 'yup';

export const changeEmailSchema = yup.object().shape({
  newEmail: yup
    .string().trim()
    .email('Please enter a valid email')
    .required('An email address is required'),
  matchingNewEmail: yup
    .string().trim()
    .oneOf([yup.ref('newEmail'), null], 'Emails do not match')
    .required('Please confirm your email'),
});
