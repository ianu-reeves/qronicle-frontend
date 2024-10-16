import * as yup from 'yup';

export const verificationCodeSchema = yup.object().shape({
  verificationCode: yup.string()
    .required('')
    .matches(/^[0-9a-f]{33}/g, { message: 'Verification code is not valid' })
});
