import {Field, Form, Formik} from "formik";
import StyledForm from "../components/StyledForm";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {toast} from "react-toastify";
import {Button, Grid, Typography} from "@mui/material";
import useGlobalTheme from "../hooks/useGlobalTheme";
import useAuth from "../hooks/useAuth";
import ValidatedTextField from "../components/ValidatedTextField";
import {changeEmailSchema} from "../validation/changeEmailSchema";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function ChangeEmail() {
  const axiosPrivate = useAxiosPrivate();
  const { currentUser } = useAuth();
  const { formGridTextField } = useGlobalTheme();
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(false);

  useEffect((() => {
    if (currentUser.accountProvider !== 'LOCAL') {
      toast.error('Accounts not registered through QRonicle may not change their email address');
      navigate('/');
    }
  }), []);

  const handleSubmit = (values, { resetForm }) => {
    setUpdating(true);
    axiosPrivate
      .patch(`/api/v1/users/${currentUser.username}/update/email`, values)
      .then(result => {
        if (result.status === 200) {
          toast.success("Your email address was updated successfully");
        }
      }).catch()
      .finally(() => {
        resetForm();
        setUpdating(false);
      });
  }

  return (
    <Formik
      initialValues={{
        newEmail: "",
        matchingNewEmail: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={changeEmailSchema}
    >
      {(form) => (
        <Form>
          <StyledForm>
            <Grid item sx={{ marginTop: 2 }}>
              <Typography variant='h4'>
                Update Your Email Address
              </Typography>
            </Grid>
            <Grid item sx={formGridTextField}>
              <Field
                fullWidth
                required
                name='newEmail'
                component={ValidatedTextField}
              />
            </Grid>
            <Grid item sx={formGridTextField}>
              <Field
                fullWidth
                required
                name='matchingNewEmail'
                component={ValidatedTextField}
              />
            </Grid>
            <Grid item sx={{ marginBottom: 2 }}>
              <Button
                color='primary'
                variant='contained'
                type='submit'
                disabled={!(form.dirty && form.isValid) && !updating}
              >
                Update email address
              </Button>
            </Grid>
          </StyledForm>
        </Form>
      )}
    </Formik>
  );
};
