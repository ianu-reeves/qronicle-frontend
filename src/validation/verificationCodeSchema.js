import * as yup from 'yup';

export const verificationCodeSchema = yup.object().shape({
  verificationCode: yup.string()
    .required('')
    .matches(/^[0-9A-Fa-f]{6}/g, { message: 'Verification code is not valid' }),
  username: yup
    .string().trim()
    .when('showUsername', {
      is: true,
      then: () => yup
        .string()
        .required('A username is required')
        .matches(/^[a-zA-Z](_?[a-zA-Z0-9]){2,24}$/g,
          { message: 'Must be 3 - 24 characters, start with a letter, & contain no consecutive underscores' })
    })
});
