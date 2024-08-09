import StyledForm from "../components/StyledForm";
import {Button, FormControl, Grid, InputLabel, Link, MenuItem, Select, Typography} from "@mui/material";
import {Field, Form, Formik} from "formik";
import useAuth from "../hooks/useAuth";
import ValidatedTextField from "../components/ValidatedTextField";
import React from "react";
import useGlobalTheme from "../hooks/useGlobalTheme";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {toast} from "react-toastify";

export default function EditProfilePage() {
  const { currentUser } = useAuth();
  const classes = useGlobalTheme();
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = (values) => {
    console.log(values)
    axiosPrivate
      .put('/api/v1/users', values, { withCredentials: true })
      .then(results => {
        console.log('USER')
        console.log(results.data)
        toast.success('Profile updated successfully!')
      })
      .catch(() => {
        console.log('error')});
  };
  console.log(currentUser)
  return (
    <Formik
      initialValues={{...currentUser}}
      onSubmit={handleSubmit}
    >
      {formik => (
        <Form>
          <StyledForm>
            <Grid item sx={{ marginTop: 2 }}>
              <Typography variant='h4'>
                Edit Profile Details
              </Typography>
            </Grid>
            <Grid item sx={classes.formGridTextField}>
              <FormControl fullWidth required sx={{maxWidth: '15%', justifySelf: 'flex-start'}}>
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
            <Grid item sx={classes.formGridTextField}>
              <Field
                fullWidth
                required
                name="firstName"
                component={ValidatedTextField}
              />
            </Grid>
            <Grid item sx={classes.formGridTextField}>
              <Field
                fullWidth
                name="lastName"
                component={ValidatedTextField}
              />
            </Grid>
            <Grid item sx={classes.formGridTextField}>
              <Field
                fullWidth
                multiline
                minRows={5}
                name='bio'
                component={ValidatedTextField}
              />
            </Grid>
            <Grid item>
              <Button type="submit" variant='contained'>
                Update
              </Button>
            </Grid>
            <Grid item sx={{ marginBottom: 2 }}>
              <Typography>
                Click <Link href='/change-password'>HERE</Link> to change your password
                or <Link>HERE</Link> to change your email address
              </Typography>
            </Grid>
          </StyledForm>
        </Form>
      )}
    </Formik>
  );
};
