import React from "react";
import {Box, Grid, IconButton, Paper, Typography} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {toast} from "react-toastify";
import {Close} from "@mui/icons-material";
import FileList from "./FileList";

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
    const files = Array.from(e.target.files);
    files.forEach((file, index) => {
      if (file.size > maxFileSize) {
        toast.error(`Failed to upload ${file.name}\nFiles cannot be larger than ${maxFileSize/ 1048576} MB`);
        files.splice(index, 1);
      }
    })
    form.setFieldValue(field.name, [...field.value, ...files]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    files.forEach((file, index) => {
      if (file.size > maxFileSize) {
        toast.error(`Failed to upload ${file.name}\nFiles cannot be larger than ${maxFileSize/ 1048576} MB`);
        files.splice(index, 1);
      }
    })
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
        <FileList files={value} handleDelete={handleDelete} />
      </Grid>
    </div>
  );
};
