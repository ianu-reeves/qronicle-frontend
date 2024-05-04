import React from 'react';
import Tag from "./Tag";
import {Grid} from "@mui/material";

export default function TagContainer({ tags }) {
  return (
    <Grid marginTop={1} container>
      {tags?.map(tag =>
        <Tag key={tag.description} tag={tag}/>
      )}
    </Grid>
  );
};
