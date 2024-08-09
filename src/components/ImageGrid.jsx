import React from 'react';
import {Card, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import {Close} from "@mui/icons-material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function ImageGrid({ width, item }) {
  const axiosPrivate = useAxiosPrivate();
  const [images, setImages] = React.useState(item.images);
  const handleDelete = (image) => {
    axiosPrivate
      .delete(`/api/v1/items/${item.id}/images/${image.id}`,{ withCredentials: true })
      .then(result => {
        console.log(result);
        setImages(result.data.images);
      })
      .catch(() => {})
  };

  return (
    <ImageList id={`image-list-${item.id}`} cols={width} sx={{paddingLeft: 2, paddingRight: 2 }}>
      {images.map((image) => (
        <ImageListItem key={image.name}>
          <img
            alt=''
            src={image.imageUrl}
          />
          <ImageListItemBar
            position="top"
            sx={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, ' +
                'rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)',
            }}
            actionIcon={
              <IconButton
                sx={{ color: 'white' }}
                onClick={() => handleDelete(image)}
              >
                <Close />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
