import React, {useEffect} from 'react';
import {
  Alert,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import GOOGLE_LOGO from '../images/google-logo.png';
import GITHUB_LOGO from '../images/github-mark.png';
import axios from "../api/axios"
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LinkedLogoButton from "../components/LinkedLogoButton";
import {toast} from "react-toastify";

const LOGIN_URL = '/auth/login'
const AUTHORIZATION_BASE_URL = 'http://localhost:8080/auth/oauth2/authorization';

export default function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const { setCurrentUser, persistLogin, setPersistLogin } = useAuth();
  const navigate = useNavigate();
  const AVATAR_SIZE = 24;

  const clearState = () => {
    setUsername('');
    setPassword('');
  };

  const togglePersistLogin = () => {
    setPersistLogin(!persistLogin)
  };

  // TODO: remove need to have this cookie present
  useEffect(() => {
    localStorage.setItem("persist", persistLogin);
  }, [persistLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            <Grid item sx={{ padding: 1, marginBottom: 2 }}>
              <Button
                variant="contained"
                type="submit"
              >
                Log in
              </Button>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox onChange={togglePersistLogin}
                                   checked={persistLogin} />}
                label="Keep me logged in"
              />
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
              avatarSize={AVATAR_SIZE}
              buttonText='Log in with Google'
            />
          </Grid>
          <Grid item sx={{ padding: 1, marginBottom: 2 }}>
            <LinkedLogoButton
              src={GITHUB_LOGO}
              href={`${AUTHORIZATION_BASE_URL}/github`}
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
              Register
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};
