import {Chip, Grid} from "@mui/material";
import React from "react";

export default function Tag({ tag }) {
  return (
    <Grid item>
      <Chip sx={{margin: 0.2}} label={tag.description}/>
    </Grid>
  );
}