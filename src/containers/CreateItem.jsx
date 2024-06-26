import ValidatedTextField from "../components/ValidatedTextField";
import StyledForm from "../components/StyledForm";
import {Field, FieldArray, Form, Formik} from "formik";
import {Button, Grid, InputAdornment, InputBase, TextField, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {axiosPrivate} from "../api/axios";
import {itemSchema} from "../validation/itemSchema";
import TagInput from "../components/TagInput";

export default function CreateItem() {
  const [allTags, setAllTags] = React.useState([]);
  const [addedTags, setAddedTags] = React.useState([]);

  const gridItemStyling = {
    width: '100%',
  };

  const handleSubmit = async (values, { setFieldError, resetForm }) => {

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
              <FieldArray
                name="tags"
                component={TagInput}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit" onClick={(e) => {
                e.preventDefault();
                console.log(formik.values)
              }}>
                Add item
              </Button>
            </Grid>
          </StyledForm>
        </Form>
      )}
    </Formik>
  );
};
