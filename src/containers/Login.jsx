import React from 'react';
import {Alert, Button, Divider, Grid, Paper, TextField, Typography} from "@mui/material";
import { GitHub, Google } from "@mui/icons-material";
import axios from "../api/axios"
import {useLocation, useNavigate} from "react-router-dom";
import UserContext from "../context/AuthProvider";

const LOGIN_URL = '/auth/login'

export default function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const { setCurrentUser } = React.useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const clearState = () => {
    setUsername('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      LOGIN_URL,
      JSON.stringify({ username, password }),
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(result => {
      console.log(result);
      clearState();
      setCurrentUser(result.data)
      navigate("/", { replace: true })
    })
    .catch((e) => {
      console.log(e)
      if (e.response?.data?.status === 401) {
        console.log('401 detected')
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
                variant="outlined"
                type="submit"
              >
                Log in
              </Button>
            </Grid>
          </form>
          <Divider sx={{ marginBottom: 2 }}>
            <Typography variant="h5">
              OR
            </Typography>
          </Divider>
          <Grid item sx={{ padding: 1 }}>
            <Button
              variant="contained"
              startIcon={<Google />}
              component="a"
              href="http://localhost:8080/oauth2/authorization/google"
            >
              Log in using Google
            </Button>
          </Grid>
          <Grid item sx={{ padding: 1 }}>
            <Button
              variant="contained"
              startIcon={<GitHub />}
              component="a"
              href="http://localhost:8080/oauth2/authorization/github"
            >
              Log in using GitHub
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};
