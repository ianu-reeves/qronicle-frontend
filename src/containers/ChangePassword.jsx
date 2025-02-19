import {Field, Form, Formik} from "formik";
import StyledForm from "../components/StyledForm";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {toast} from "react-toastify";
import {changePasswordSchema} from "../validation/changePasswordSchema";
import {Button, Grid, Typography} from "@mui/material";
import useGlobalTheme from "../hooks/useGlobalTheme";
import ValidatedPasswordField from "../components/ValidatedPasswordField";
import useAuth from "../hooks/useAuth";

export default function ChangePassword() {
  const axiosPrivate = useAxiosPrivate();
  const { currentUser } = useAuth();
  const { formGridTextField } = useGlobalTheme();
  const handleSubmit = (values, { resetForm }) => {
    axiosPrivate
      .patch(`/api/v1/users/${currentUser.username}/update/password`, values)
      .then(result => {
        if (result.status === 200) {
          toast.success("Your password was updated successfully");
        }
      }).catch()
      .finally(() => resetForm());
  }
  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        matchingNewPassword: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={changePasswordSchema}
    >
      {() => (
        <Form>
          <StyledForm>
            <Grid item sx={{ marginTop: 2 }}>
              <Typography variant='h4'>
                Update Your Password
              </Typography>
            </Grid>
            <Grid item sx={formGridTextField}>
              <Field
                fullWidth
                required
                name='oldPassword'
                component={ValidatedPasswordField}
              />
            </Grid>
            <Grid item sx={formGridTextField}>
              <Field
                fullWidth
                required
                name='newPassword'
                component={ValidatedPasswordField}
              />
            </Grid>
            <Grid item sx={formGridTextField}>
              <Field
                fullWidth
                required
                name='matchingNewPassword'
                component={ValidatedPasswordField}
              />
            </Grid>
            <Grid item sx={{ marginBottom: 2 }}>
              <Button color='primary' variant='contained' type='submit'>
                Update password
              </Button>
            </Grid>
          </StyledForm>
        </Form>
      )}
    </Formik>
  );
};
