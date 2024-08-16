import {Grid, IconButton, Paper, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";
import React from "react";

export default function FileList({ files, handleDelete }) {
  return (
    <Grid
      container
      justifyContent="center"
      sx={{ marginTop: 1, marginBottom: 1 }}
    >
      {files.map((file, index) => (
        <Paper
          component={Grid}
          elevation={3}
          key={`${file.name}-grid-item`}
          container
          rowSpacing={1}
          sx={{ width: '75%', height: 65, justifyContent: 'start', marginTop: 1 }}
        >
          <Grid
            item
            sx={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'flex-start',
              paddingLeft: 1,
            }}
          >
            <img
              alt={file.name}
              style={{ height: 50, width: 50 }}
              src={URL.createObjectURL(file)}
            />
          </Grid>
          <Grid
            item
            xs
            sx={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
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
            <IconButton onClick={() => handleDelete(index)} sx={{ width: 50, height: 50 }}>
              <Close />
            </IconButton>
          </Grid>
        </Paper>))}
      </Grid>
  );
};
