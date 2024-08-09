import React from "react";
import {Box, Grid, IconButton, Paper, Typography} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {toast} from "react-toastify";
import {Close} from "@mui/icons-material";

const defaultStyle = {
  border: '4px solid lightgreen',
  position: 'relative',
  width: '75%',
  borderRadius: 4,
  cursor: 'pointer',
};

const errorStyle = {
  border: '4px solid red',
  position: 'relative',
  width: '75%',
  borderRadius: 4,
  cursor: 'pointer',
};

export default function FileUpload({ form, field, ...props }) {
  const { acceptTypes, maxFileSize, inputId } = props;
  const { value } = field;
  const handleClick = () => {
    document.getElementById(inputId).click();
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file.size > maxFileSize) {
      toast.error(`Files cannot be larger than ${maxFileSize/ 1024} MB`);
      return;
    }
    form.setFieldValue(field.name, [...field.value, file]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    console.log(e)
    const files = e.dataTransfer.files;
    form.setFieldValue(field.name, [...field.value, ...files]);
  };

  const handleDelete = (index) => {
    const newFiles = field.value;
    form.setFieldValue(newFiles.splice(index, 1));
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Grid
        container
        justifyContent="center"
      >
        <Box
          component={Grid}
          container
          justifyContent="center"
          direction="column"
          sx={form.errors[field.name] ? errorStyle : defaultStyle}
          onClick={handleClick}
        >
          <input
            id={inputId}
            type="file"
            multiple
            style={{ display: 'none' }}
            accept={acceptTypes}
            onChange={handleUpload}
          />
          <Grid item>
            <FileUploadIcon
              sx={{
                width: 50,
                height: 50,
              }}
            />
          </Grid>
          <Grid item>
            {form.errors[field.name]
              ? (
                <Typography sx={{ color: 'red' }}>
                  {form.errors[field.name]}
                </Typography>
              )
              : (
                <>
                  <Typography
                    variant="h5"
                  >
                    Drag and drop your files here
                  </Typography>
                  <Typography variant="subtitle1">
                    Or click to browse your device
                  </Typography>
                </>
              )
            }
          </Grid>
        </Box>
        <Grid
          container
          justifyContent="center"
          sx={{ marginTop: 1 }}
        >
          {value.map((file, index) => (
            <Paper
              component={Grid}
              elevation={3}
              key={`${file.name}-grid-item`}
              container
              rowSpacing={1}
              sx={{ width: '75%', justifyContent: 'start', marginTop: 1 }}
            >
              <Grid
                item
                xs
                sx={{
                  display: 'flex',
                  alignContent: 'center',
                  justifyContent: 'flex-start',
                  paddingLeft: 1,
              }}
              >
                <Typography sx={{ justifySelf: 'start' }}>{file.name}</Typography>
              </Grid>
              <Grid
                item
                xs
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <IconButton onClick={() => handleDelete(index)}>
                  <Close />
                </IconButton>
              </Grid>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};
