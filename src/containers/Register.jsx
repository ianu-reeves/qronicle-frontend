import React from "react";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment, InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import { registrationSchema } from "../validation/registrationSchema";
import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import ValidatedTextField from "../components/ValidatedTextField";
import axios from "../api/axios";

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const inputFieldStyle = { margin: 1, maxWidth: '75%' };

  const onSubmit = async (values, { setStatus }) => {
    console.log(values);
    await axios
      .post("/auth/register", values)
      .then(result => console.log(result))
      .catch((e) => {
        if (e.response.status === 409) {
          console.log('409 DETECTED')
          setStatus('duplicate-username');
        }
      })
    // actions.resetForm();
  };

  const handlePasswordIconButtonClick = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordIconButtonClick = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
                <Grid item>
                  <Field
                    fullWidth
                    required
                    name="firstName"
                    sx={inputFieldStyle}
                    component={ValidatedTextField}
                  />
                </Grid>
                <Grid item>
                  <Field
                    fullWidth
                    name="lastName"
                    sx={inputFieldStyle}
                    component={ValidatedTextField}
                  />
                </Grid>
                <Grid item>
                  <Field
                    fullWidth
                    required
                    name="email"
                    sx={inputFieldStyle}
                    component={ValidatedTextField}
                  />
                </Grid>
                <Grid item>
                  <Field
                    fullWidth
                    required
                    name="confirmEmail"
                    sx={inputFieldStyle}
                    component={ValidatedTextField}
                  />
                </Grid>
                <Grid item sx={{marginTop: 2}}>
                  <Typography variant="h6">
                    Set up your account
                  </Typography>
                </Grid>
                <Grid item>
                  <FormControl required fullWidth sx={{...inputFieldStyle, maxHeight: 50}}>
                    <InputLabel id="privacy-status-selector-label">Account status</InputLabel>
                    <Select
                      name="privacyStatus"
                      labelId="privacy-status-selector-label"
                      label="Account status"
                      value={formik.values.privacyStatus}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={Boolean(formik.errors.privacyStatus) && Boolean(formik.touched.privacyStatus)}
                    >
                      <MenuItem value={'PRIVATE'}>Private</MenuItem>
                      <MenuItem value={'PUBLIC'}>Public</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Field
                    fullWidth
                    required
                    name="username"
                    sx={inputFieldStyle}
                    component={ValidatedTextField}
                  />
                </Grid>
                <Grid item>
                  <Field
                    fullWidth
                    required
                    name="password"
                    sx={inputFieldStyle}
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
                <Grid item>
                  <Field
                    fullWidth
                    required
                    name="confirmPassword"
                    sx={inputFieldStyle}
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
                {/*<Grid item>*/}
                {/*  <ValidatedTextField*/}
                {/*    placeholder="(Optional) Tell us a bit about yourself! You can edit this section at any time in your profile."*/}
                {/*    fullWidth*/}
                {/*    multiline*/}
                {/*    minRows={5}*/}
                {/*    fieldName="bio"*/}
                {/*    formikProps={formikValidationProps}*/}
                {/*    sx={inputFieldStyle}*/}
                {/*  />*/}
                {/*</Grid>*/}
                <Grid item sx={{marginTop: 5}}>
                  <Button type="submit" variant="contained">
                    Sign me up!
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </>
  );
}
