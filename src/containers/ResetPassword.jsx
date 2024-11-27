import {useNavigate, useSearchParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import StyledForm from "../components/StyledForm";
import {Alert, Button, Grid, Typography} from "@mui/material";
import StyledGridItem from "../components/StyledGridItem";
import ValidatedPasswordField from "../components/ValidatedPasswordField";
import {resetPasswordSchema} from "../validation/resetPasswordSchema";
import axios from "../api/axios";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [params] = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    axios
      .get(`/api/v1/users/validatePasswordReset/${code}`)
      .then((res) => {
        setEmail(res.data);
      })
      .catch(() => setError(true));
  });

  const handleSubmit = (values, {resetForm}) => {
    axios
      .post('/api/v1/users/resetPassword', values)
      .then(res => {
        toast.success('Your password has been reset successfully')
        navigate('/', {replace: true});
      })
      .catch()
      .finally(() => resetForm());
  };

  return (
    <Formik
      initialValues={{
        newPassword: '',
        confirmNewPassword: '',
        code,
      }}
      onSubmit={handleSubmit}
      validationSchema={resetPasswordSchema}
    >
      {() => (
        <Form>
          <StyledForm paperStyle={{marginTop: '10%', width: '75%', maxWidth: 1000}}>
            {error
              ? <Alert
                variant='filled'
                severity='error'
                sx={{
                  minHeight: 100,
                  width: '75%',
                  padding: 2,
                  margin: 2,
                }}
              >
                <Typography variant='body1' style={{fontWeight: 'bold'}}>
                  Password reset link is expired or poorly formatted
                </Typography>
                If you still need to reset your password, please return to the login page to request a new
                password reset
              </Alert>
              : <>
                <Grid item>
                  <Typography variant='h4'>
                    Reset password for {email}
                  </Typography>
                </Grid>
                <StyledGridItem>
                  <Field
                    fullWidth
                    required
                    name='newPassword'
                    component={ValidatedPasswordField}
                    inputProps={{maxLength: 50}}
                  />
                </StyledGridItem>
                <StyledGridItem style={{marginBottom: '2%'}}>
                  <Field
                    fullWidth
                    required
                    name='confirmNewPassword'
                    component={ValidatedPasswordField}
                    inputProps={{maxLength: 50}}
                  />
                </StyledGridItem>
                <StyledGridItem style={{marginBottom: '3%'}}>
                  <Button type='submit' variant='contained'>
                    Reset my password
                  </Button>
                </StyledGridItem>
              </>}
          </StyledForm>
        </Form>
      )}
    </Formik>
  );
};
