import React, {useEffect} from 'react';
import {Alert, Button, Grid, Typography} from "@mui/material";
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

  useEffect(() => {(
      currentUser.roles?.filter(role => role.name === 'ROLE_VERIFIED').length > 0
      || !(Object.keys(currentUser).length > 0)
    ) && navigate('/');
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
    const { username, verificationCode } = values;
    axios
      .post(
        `/auth/verifyRegistration`,
        JSON.stringify({ verificationToken: verificationCode, username }),
      )
      .then((result) => {
        toast.success("Your account was successfully verified");
        setCurrentUser(result.data.userDetails);
        navigate('/');
      })
      .catch(e => {
        toast.error("There was an error verifying your account")
        setError(e.response.data)
      })
      .finally(() => resetForm());
  };
//TODO: verify code is valid
  return (
    <Formik
      initialValues={{
        verificationCode: '',
        username: '',
        showUsername: currentUser.accountProvider !== 'LOCAL',
      }}
      onSubmit={handleClickVerify}
      validationSchema={verificationCodeSchema}
    >
      {formik =>
        <Form>
          <StyledForm paperStyle={{ maxWidth: '75%', marginTop: 2 }}>
            <Grid item>
              <Typography variant='h4'>
                Almost there! We just need to get you verified
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
                Enter your 6 digit verification code {currentUser.accountProvider !== 'LOCAL'
                && 'and choose a username'}
              </Typography>
            </Grid>
            {error &&
            <Grid item>
              <Alert variant='filled' severity='error'>
                {error}
              </Alert>
            </Grid>
            }
            <Grid item sx={{ marginTop: 1, marginBottom: 1, minWidth: '60%' }}>
              <Field
                fullWidth
                required
                autoComplete='off'
                name='verificationCode'
                placeholder='Enter code here'
                inputProps={{ maxLength: 6 }}
                component={ValidatedTextField}
              />
            </Grid>
            {currentUser.accountProvider !== 'LOCAL' &&
              <Grid item sx={{ marginBottom: 1, minWidth: '60%' }}>
                <Field
                  fullWidth
                  required={currentUser.accountProvider !== 'LOCAL'}
                  autoComplete='off'
                  name='username'
                  placeholder='Please choose a username'
                  sx={{ maxWidth: '75%' }}
                  component={ValidatedTextField}
                />
              </Grid>
            }
            <Grid item sx={{ marginTop: 1, marginBottom: 2 }}>
              <Button
                disabled={!(formik.dirty && (Object.keys(formik.errors).length === 0))}
                variant='contained'
                type='submit'
              >
                Verify
              </Button>
            </Grid>
          </StyledForm>
        </Form>
      }
    </Formik>
  );
};
