import React, {useEffect} from 'react';
import {Alert, Button, Grid, InputAdornment, Typography} from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import StyledForm from "../components/StyledForm";
import ValidatedTextField from "../components/ValidatedTextField";
import {Field, Form, Formik} from "formik";
import {verificationCodeSchema} from "../validation/verificationCodeSchema";
import useAuth from "../hooks/useAuth";

export default function Unverified() {
  const axios = useAxiosPrivate();
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = React.useState('');
  const [awaitingSubmission, setAwaitingSubmission] = React.useState(false);

  useEffect(() => {
    (currentUser.verified || !(Object.keys(currentUser).length > 0)) && navigate('/');
  }, []);

  const handleClickResend = () => {
    setAwaitingSubmission(true);
    axios
      .get('/auth/reSendVerification',{ withCredentials: true })
      .then(result => {
        if (result.status === 200) {
          toast('A verification code was sent to your email address');
        } else if (result.status === 403) {
          toast.error('Your account has already been verified');
          navigate('/');
        }
      })
      .catch(() => {
        toast.error('There was an error processing your request. Please try again');
      })
      .finally(() => {
        setAwaitingSubmission(false);
      });
  };

  const handleClickVerify = (values, { resetForm }) => {
    axios
      .post(
        `/auth/verifyRegistration`,
        { verificationCode: values.verificationCode.toUpperCase() },
        {withCredentials: true}
      )
      .then((result) => {
        console.log(result)
        toast.success("Your account was successfully verified");
        setCurrentUser(result.data.userDetails);
        navigate('/');
      })
      .catch(e => {
        setError(e.response.data)
      })
      .finally(() => resetForm());
  };
//TODO: verify code is valid
  return (
    <Formik
      initialValues={{
        verificationCode: '',
      }}
      onSubmit={handleClickVerify}
      validationSchema={verificationCodeSchema}
    >
      {formik =>
        <Form>
          <StyledForm paperStyle={{ maxWidth: '75%', marginTop: 2 }}>
            <Grid item>
              <Typography variant='h4'>
                Your account is not yet verified
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='h6'>
                Until you verify your account, you will be unable to access site features. An email to verify your account
                was sent to your email address when you registered. If you need another verification email, please click the
                button below.
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                onClick={handleClickResend}
                disabled={awaitingSubmission}
              >
                {awaitingSubmission
                  ? 'Requesting new verification code'
                  : 'Resend verification code'
                }
              </Button>
            </Grid>
            <Grid item>
              <Typography variant='h5'>
                Enter your 6 digit verification code in the box below
              </Typography>
            </Grid>
            {error &&
            <Grid item>
              <Alert variant='filled' severity='error'>
                {error}
              </Alert>
            </Grid>
            }
            <Grid item sx={{ marginTop: 1, marginBottom: 2, minWidth: '60%' }}>
              <Field
                fullWidth
                autoComplete='off'
                name='verificationCode'
                placeholder='Enter code here'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Button
                        disabled={!(formik.dirty && (Object.keys(formik.errors).length === 0))}
                        variant='contained'
                        type='submit'
                      >
                        Verify
                      </Button>
                    </InputAdornment>
                )}}
                inputProps={{ maxLength: 6 }}
                component={ValidatedTextField}
              />
            </Grid>
          </StyledForm>
        </Form>
      }
    </Formik>
  );
};
