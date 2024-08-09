import {Form, Formik} from "formik";
import StyledForm from "../components/StyledForm";

export default function ChangePassword() {
  return (
    <Formik
      initialValues={}
      onSubmit={}
    >
      {formik => (
        <Form>
          <StyledForm>

          </StyledForm>
        </Form>
      )}
    </Formik>
  );
};
