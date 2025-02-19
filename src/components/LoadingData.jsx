import {CircularProgress, Typography} from "@mui/material";
import React from "react";

export default function LoadingData({ loadingText }) {
  return (
    <>
      <Typography variant='h4'>
        {loadingText || 'Loading... Please wait...'}
      </Typography>
      <CircularProgress />
    </>
  );
};
