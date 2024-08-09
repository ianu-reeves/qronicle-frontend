import React from "react";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment, InputLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import { registrationSchema } from "../validation/registrationSchema";
import { Field, Form, Formik } from "formik";
import ValidatedTextField from "../components/ValidatedTextField";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import StyledForm from "../components/StyledForm";

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const onSubmit = async (values, { setFieldError, resetForm }) => {
    console.log(values);
    await axios
      .post("/auth/register", values, { withCredentials: true })
      .then(result => {
        resetForm();
        setCurrentUser(result.data.userDetails);
        navigate("/", { replace: true });
        toast(`Welcome aboard, ${result.data.userDetails.username}!`)
      })
      .catch((e) => {
        if (e.response.status === 409) {
          console.log('409 DETECTED')
          setFieldError('username', 'That username is not available. Please try another one');
        }
        toast.error("Please check the form & try again");
      })
  };

  const gridItemStyling = {
    width: '100%',
  };

  const handlePasswordIconButtonClick = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordIconButtonClick = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        confirmEmail: "",
        username: "",
        password: "",
        confirmPassword: "",
        privacyStatus: "",
      }}
      onSubmit={onSubmit}
      validationSchema={registrationSchema}
    >
      {formik=> (
        <Form>
          <StyledForm>
            <Grid item>
              <Typography variant="h4" sx={{marginBottom: 5}}>
                Create a new account
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Personal information
              </Typography>
            </Grid>
            <Grid item sx={gridItemStyling}>
              <Field
                fullWidth
                required
                name="firstName"
                component={ValidatedTextField}
              />
            </Grid>
            <Grid item sx={gridItemStyling}>
              <Field
                fullWidth
                name="lastName"
                component={ValidatedTextField}
              />
            </Grid>
            <Grid item sx={gridItemStyling}>
              <Field
                fullWidth
                required
                name="email"
                component={ValidatedTextField}
              />
            </Grid>
            <Grid item sx={gridItemStyling}>
              <Field
                fullWidth
                required
                name="confirmEmail"
                component={ValidatedTextField}
              />
            </Grid>
            <Grid item sx={{marginTop: 2}}>
              <Typography variant="h6">
                Set up your account
              </Typography>
            </Grid>
            <Grid item sx={gridItemStyling}>
              <FormControl required fullWidth sx={{maxWidth: '15%', justifySelf: 'center'}}>
                <InputLabel id="privacy-status-selector-label">Account status</InputLabel>
                <Select
                  name="privacyStatus"
                  labelId="privacy-status-selector-label"
                  label="Account status"
                  value={formik.values.privacyStatus}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.errors.privacyStatus) && Boolean(formik.touched.privacyStatus)}
                  fullWidth
                >
                  <MenuItem value={'PRIVATE'}>Private</MenuItem>
                  <MenuItem value={'PUBLIC'}>Public</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sx={gridItemStyling}>
              <Field
                fullWidth
                required
                name="username"
                component={ValidatedTextField}
              />
            </Grid>
            <Grid item sx={gridItemStyling}>
              <Field
                fullWidth
                required
                name="password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordIconButtonClick}>
                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                component={ValidatedTextField}
              />
            </Grid>
            <Grid item sx={gridItemStyling}>
              <Field
                fullWidth
                required
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleConfirmPasswordIconButtonClick}>
                        {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                component={ValidatedTextField}
              />
            </Grid>
            <Grid item sx={{marginTop: 5}}>
              <Button type="submit" variant="contained">
                Sign me up!
              </Button>
            </Grid>
          </StyledForm>
        </Form>
      )}
    </Formik>
  );
}
