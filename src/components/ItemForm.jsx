import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { itemSchema } from "../validation/itemSchema";
import StyledForm from "./StyledForm";
import ValidatedTextField from "./ValidatedTextField";
import TagInput from "./TagInput";
import FileUpload from "./FileUpload";

export default function ItemForm({ handleSubmit, handleFileDrop, item }) {
  const MAX_FILE_SIZE = 1048576 * 10;  // 10 MB
  const MAX_TAGS = 50;
  const gridItemStyling = {
    width: '100%',
  };

  const initialValues = {
    id: item ? item.id : 0,
    name: item ? item.name : '',
    description: item ? item.description : '',
    tags: item ? item.tags.map(tag => tag.description) : [],
    images: item ? item.images : [],
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={itemSchema}
    >
      {({ dirty, resetForm }) => (
        <Form>
          <StyledForm paperStyle={{ paddingTop: 3, paddingBottom: 3, width: '50%', marginTop: '10%' }}>
            <Grid item>
              <Typography variant="h4" sx={{ marginBottom: 5 }}>
                {item ? 'Edit item details' : 'Add a new item'}
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
            {!item &&
              // only display file upload if item is new
              // users can use item page to upload/ delete images for existing items
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
            }
            <Grid item>
              <Button disabled={!dirty} type="submit" variant="contained">
                {item ? 'Save changes' : 'Add item'}
              </Button>
            </Grid>
            {dirty &&
              <Grid item sx={gridItemStyling}>
                <Button variant='outlined' onClick={() => resetForm()}>
                  {item ? 'Undo changes' : 'Reset form'}
                </Button>
              </Grid>
            }
          </StyledForm>
        </Form>
      )}
    </Formik>
  );
}