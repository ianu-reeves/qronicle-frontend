import React, {useState} from 'react';
import * as yup from 'yup';
import {
  Alert,
  Button, CircularProgress,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Divider,
  Grid, Link,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import GOOGLE_LOGO from '../images/google-logo.png';
import GITHUB_LOGO from '../images/github-mark.png';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LinkedLogoButton from "../components/LinkedLogoButton";
import {toast} from "react-toastify";
import {Field, Form, Formik} from "formik";
import ValidatedTextField from "../components/ValidatedTextField";

const LOGIN_URL = `${process.env.REACT_APP_BACKEND_ROOT_URL}/auth/login`;
const AUTHORIZATION_BASE_URL = `${process.env.REACT_APP_BACKEND_ROOT_URL}/auth/oauth2/authorization`;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showResetWindow, setShowResetWindow] = useState(false);
  const [dialogContent, setDialogContent] = useState(<></>);
  const [loggingIn, setLoggingIn] = useState(false)
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const AVATAR_SIZE = 24;

  const clearState = () => {
    setUsername('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    await axios.post(
      LOGIN_URL,
      JSON.stringify({ username, password }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then(result => {
      clearState();
      setCurrentUser(result.data.userDetails);
      // TODO: use location to return to previous page
      toast(`Welcome back, ${result.data.userDetails.username}!`)
      navigate("/", { replace: true });
    })
    .catch((e) => {
      if (e.response?.data?.status === 401) {
        setError(e.response.data.message);
      } else {
        setError("There was an error signing in. Please try again")
      }
    });
  };

  const handleSubmitResetRequest = (values) => {
    const successDialogContent = (<>
      <DialogTitle>
        Success!
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          If an account with that email address exists, you will receive an email shortly with instructions
          on how to reset your password.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          onClick={() => setShowResetWindow(false)}
        >
          Okay
        </Button>
      </DialogActions>
    </>);

    setDialogContent(successDialogContent);

    axios
      .post(`${process.env.REACT_APP_BACKEND_ROOT_URL}/api/v1/users/requestPasswordReset`, values)
      .catch(() => toast.error("There was an issue with your request. Please try again"));
  };

  const handleOpenDialog = () => {
    setShowResetWindow(true);
    setDialogContent(
      <Formik
        initialValues={{
          emailAddress: '',
        }}
        onSubmit={handleSubmitResetRequest}
        validationSchema={yup.object().shape({
          emailAddress: yup
            .string().trim()
            .email('Please enter a valid email address')
            .required('You must enter an email address')
        })}
      >
        {() => (
          <Form>
            <DialogTitle>
              Reset your password
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                If you have forgotten your password, please enter your email address below to receive a link to reset it.
              </DialogContentText>
            <Field
              fullWidth
              autoFocus
              name='emailAddress'
              required
              component={ValidatedTextField}
              sx={{ marginTop: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowResetWindow(false)}>
              Cancel
            </Button>
            <Button type='submit' variant='contained'>
              Send Reset Email
            </Button>
          </DialogActions>
        </Form>
      )}
      </Formik>
    );
  };

  return (
    <>
      <Grid
        justifyContent="center"
        alignItems="center"
        container
        direction="column"
        sx={{ marginTop: '10%' }}
      >
        <Paper sx={{ padding: 3, width: '50%' }}>
          {loggingIn
            ? <>
              <Typography variant='h4'>
                Logging in... Please wait...
              </Typography>
              <CircularProgress />
            </>
            : <>
              <form onSubmit={handleSubmit}>
                <Grid item>
                  <Typography variant="h4">Sign in</Typography>
                </Grid>
                <Grid item>
                {error
                  ? <Alert
                    variant="filled"
                    severity="error"
                    sx={{ marginBottom: 1 }}
                  >
                    {error}
                  </Alert>
                  : null
                }
                </Grid>
                <Grid item sx={{ padding: 1 }}>
                  <TextField
                    fullWidth
                    required
                    label="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item sx={{ padding: 1 }}>
                  <TextField
                    fullWidth
                    type="password"
                    required
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item sx={{ padding: 1 }}>
                  <Button
                    variant="contained"
                    type="submit"
                  >
                    Log in
                  </Button>
                </Grid>
                <Grid item sx={{ padding: 1, marginBottom: 2 }}>
                  <Typography variant='subtitle2'>
                    <Link sx={{ textDecoration: 'none', cursor: 'pointer' }} onClick={handleOpenDialog}>
                      Forgot your password?
                    </Link>
                  </Typography>
                </Grid>
              </form>
              <Divider sx={{ marginBottom: 2 }}>
                <Typography variant="h5">
                  OR
                </Typography>
              </Divider>
              <Grid item sx={{ padding: 1 }}>
                <LinkedLogoButton
                  src={GOOGLE_LOGO}
                  href={`${AUTHORIZATION_BASE_URL}/google`}
                  onClick={() => setLoggingIn(true)}
                  avatarSize={AVATAR_SIZE}
                  buttonText='Log in with Google'
                />
              </Grid>
              <Grid item sx={{ padding: 1, marginBottom: 2 }}>
                <LinkedLogoButton
                  src={GITHUB_LOGO}
                  href={`${AUTHORIZATION_BASE_URL}/github`}
                  onClick={() => setLoggingIn(true)}
                  avatarSize={AVATAR_SIZE}
                  buttonText='Log in with GitHub'
                />
              </Grid>
              <Divider />
              <Grid item sx={{ padding: 1 }}>
                <Typography variant="h5">Need an account?</Typography>
                <Button
                  variant="outlined"
                  component="a"
                  href="/register"
                  sx={{ marginTop: 2 }}
                >
                  Register Now
                </Button>
              </Grid>
            </>
          }
        </Paper>
      </Grid>

      <Dialog
        open={showResetWindow}
        onClose={() => setShowResetWindow(false)}
      >
        {dialogContent}
      </Dialog>
    </>
  );
};
