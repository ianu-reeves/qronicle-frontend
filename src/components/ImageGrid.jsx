import React from 'react';
import {Card, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography} from "@mui/material";
import {Add, Close} from "@mui/icons-material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {toast} from "react-toastify";
import {Constants} from "../util/Constants";

const DISPLAY_HEIGHT = 300;

export default function ImageGrid({ width, images, itemBar }) {
  const axiosPrivate = useAxiosPrivate();
  const { MAX_FILE_SIZE, MAX_IMAGES } = Constants;

  const handleClick = () => {
    document.getElementById('file-upload').click();
  };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file, index) => {
      if (file.size > MAX_FILE_SIZE) {
        files.splice(index, 1);
        return toast.error(
          `Failed to upload ${file.name}\nFiles cannot be larger than ${MAX_FILE_SIZE/ 1048576} MB`);
      }
    });
    if (files.length + images.length > MAX_IMAGES) {
      return toast.error(`Items cannot have more than ${MAX_IMAGES} images each.`);
    }


    // TODO: add controller method
    //  Add validation
    // axiosPrivate
    //   .put()
    // files.forEach((file, index) => {
    //   if (file.size > MAX_FILE_SIZE) {
    //     toast.error(`Failed to upload ${file.name}\nFiles cannot be larger than ${MAX_FILE_SIZE/ 1048576} MB`);
    //     files.splice(index, 1);
    //   }
    // })
  };

  return (
    <ImageList
      id={`image-list`}
      cols={width}
      sx={{paddingLeft: 2, paddingRight: 2 }}
      rowHeight={DISPLAY_HEIGHT}
    >
      {images.map((image) => (
        <ImageListItem key={`image-list-item-${image.name}`}>
          <img
            alt=''
            src={image.imageUrl}
            style={{ height: DISPLAY_HEIGHT }}
          />
          {itemBar && itemBar(image)}
        </ImageListItem>
      ))}
      {images.length < MAX_IMAGES &&
        // show tile to add new images if not all image slots have been used
        <Grid
          container
          direction='column'
          sx={{
            minHeight: DISPLAY_HEIGHT,
            alignSelf: 'center',
            justifySelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            height: '100%',
            border: '2px lightgrey solid',
            borderRadius: 2,
          }}
        >
          <Grid item>
            <IconButton onClick={handleClick} sx={{height: 100, width: 100}}>
              <input
                id='file-upload'
                type="file"
                style={{display: 'none'}}
                accept=".jpg, .jpeg, .png"
                onChange={handleUpload}
              />
              <Add fontSize='large'/>
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant='h6'>
              Add new
            </Typography>
          </Grid>
        </Grid>
      }
    </ImageList>
  );
};
