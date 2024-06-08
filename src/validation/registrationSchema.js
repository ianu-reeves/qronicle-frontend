import * as yup from 'yup';

//TODO: add regex for passwords
export const registrationSchema = yup.object().shape({
    firstName: yup
      .string().trim()
      .max(50, 'First name must be 50 characters or less')
      .required('First name is required'),
    lastName: yup
      .string().trim(),
      // .test(
      //   'less-than-50-or-null',
      //   'Last name must be 50 characters or less',
      //   (val) => val.length <= 50),
    email: yup
      .string().trim()
      .email('Please enter a valid email')
      .required('An email address is required'),
    confirmEmail: yup
      .string().trim()
      .oneOf([yup.ref('email'), null], 'Emails do not match')
      .required('Please confirm your email'),
    username: yup
      .string().trim()
      .min(3)
      .max(24)
      .required('A username is required'),
    password: yup
      .string()
      .min(10)
      .max(50)
      .required('A password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords do not match')
      .required('Please confirm your password'),
  });
