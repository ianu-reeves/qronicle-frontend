import ValidatedTextField from "../components/ValidatedTextField";
import StyledForm from "../components/StyledForm";
import {Field, FieldArray, Form, Formik} from "formik";
import {Button, Grid, InputAdornment, InputBase, TextField, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {axiosPrivate} from "../api/axios";
import {itemSchema} from "../validation/itemSchema";
import TagInput from "../components/TagInput";
import FileUpload from "../components/FileUpload";
import {toast} from "react-toastify";

export default function CreateItem() {
  const MAX_FILE_SIZE = 1048576 * 10;  // 10 MB
  const MAX_TAGS = 50;

  const gridItemStyling = {
    width: '100%',
  };

  const handleSubmit = async (values, { setFieldError, resetForm }) => {
    const form = new FormData();
    const itemForm = { name: values.name, description: values.description, tags: values.tags }
    form.append("itemForm", new Blob([JSON.stringify(itemForm)], { type: 'application/json' }))
    values.images.forEach((image) => form.append('files', image));

    await axiosPrivate
      .post('/api/v1/items', form, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } })
      .then((result) => console.log('SUCCESS', result))
      .catch(() => {});
  };

  const handleFileDrop = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.size > MAX_FILE_SIZE && toast.error('Files may not be more than 10MB each');
      console.log(file);
    }
  };

//TODO add validation schema
// add tag input component
// add images input component
  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        tags: [],
        images: [],
      }}
      onSubmit={handleSubmit}
      validationSchema={itemSchema}
    >
      {formik => (
        <Form>
          <StyledForm>
            <Grid item>
              <Typography variant="h4" sx={{ marginBottom: 5 }}>
                Add a new item
              </Typography>
            </Grid>
            <Grid item sx={gridItemStyling}>
              <Field
                fullWidth
                required
                name="name"
                component={ValidatedTextField}
              />
            </Grid>
            <Grid item sx={gridItemStyling}>
              <Field
                fullWidth
                multiline
                minRows={5}
                name="description"
                placeholder="Add some extra information about your item here"
                component={ValidatedTextField}
              />
            </Grid>
            <Grid item sx={gridItemStyling}>
              <Field
                name="tags"
                component={TagInput}
                maxTags={MAX_TAGS}
              />
            </Grid>
            <Grid item sx={gridItemStyling}>
              <Field
                name="images"
                inputId="itemImageUpload"
                acceptTypes=".jpg, .jpeg, .png"
                maxFileSize={MAX_FILE_SIZE}  // 10 MB
                handleUpload={handleFileDrop}
                component={FileUpload}
              />
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained">
                Add item
              </Button>
            </Grid>
          </StyledForm>
        </Form>
      )}
    </Formik>
  );
};
