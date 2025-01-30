import React, {useEffect} from 'react';
import {toast} from "react-toastify";
import ItemForm from "../components/ItemForm";
import {useParams} from "react-router-dom";
import {
  Box,
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography
} from "@mui/material";
import StyledForm from "../components/StyledForm";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {Constants} from "../util/Constants";
import {Add, Close} from "@mui/icons-material";
import FileList from "../components/FileList";

const DISPLAY_HEIGHT = 300;

export default function EditItem() {
  const { itemId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [item, setItem] = React.useState();
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const { MAX_FILE_SIZE, MAX_IMAGES } = Constants;  // 10 MB

  useEffect(() => {
    axiosPrivate
      .get(`/api/v1/items/${itemId}`)
      .then(results => {
        setItem(results.data);
        setImages(results.data.images);
        setLoading(false);
      })
      .catch(() => {})
  }, [axiosPrivate, itemId]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setFiles([]);
    setDialogOpen(false);
  };

  const uploadFiles = (filesToAdd) => {
    filesToAdd.forEach((file, index) => {
      if (file.size > MAX_FILE_SIZE) {
        filesToAdd.splice(index, 1);
        return toast.error(
          `Failed to upload ${file.name}\nFiles cannot be larger than ${MAX_FILE_SIZE/ 1048576} MB`);
      }
    });
    if (filesToAdd.length + images.length + files.length > MAX_IMAGES) {
      return toast.error(`Items cannot have more than ${MAX_IMAGES} images each.`);
    }
    setFiles([...files, ...filesToAdd]);
  };

  const handleUpload = (e) => {
    const filesToAdd = Array.from(e.target.files);
    uploadFiles(filesToAdd);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const filesToAdd = Array.from(e.dataTransfer.files);
    uploadFiles(filesToAdd);
  };

  const handleClick = () => {
    document.getElementById('file-upload').click();
  };

  const handleUpdateDetails = async (values, { resetForm }) => {
    axiosPrivate
      .put('/api/v1/items', values)
      .then((result) => {
        setItem(result.data);
        resetForm();
        toast.success('Item updated successfully!');
      })
      .catch(() => {});
  };

  const handleUpdateImages = async () => {
    const form = new FormData();
    form.append("item", new Blob([JSON.stringify(item)], { type: 'application/json' }));
    files.forEach((image) => form.append('files', image));

    await axiosPrivate
      .post(`/api/v1/items/${item.id}/images`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(result => {
        setItem(result.data);
        setImages(result.data.images);
        handleCloseDialog();
      })
      .catch(e => {
        handleCloseDialog();
        // content too large
        if (e.response.status === 413) {
          return toast.error(`Files may be a maximum of ${MAX_FILE_SIZE/ 1048576} MB`);
        }
        return toast.error('There was an issue with your request. Please try again')
      })
  };

  const handleDeleteImage = async (image) => {
    await axiosPrivate
      .delete(`/api/v1/items/${item.id}/images/${image.id}`)
      .then(result => {
        toast.success(`Successfully deleted ${image.name}`);
        setImages(result.data.images);
      })
      .catch(() => {})
  };

  const handleDeleteFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
  // TODO: adjust so width prop passed to ImageGrid is based on screen width
  return (
    loading
      ? <Typography>Loading...</Typography>
      : <>
        <ItemForm handleSubmit={handleUpdateDetails} item={item}/>
          <StyledForm paperStyle={{ paddingTop: 3, paddingBottom: 3, width: '50%', marginTop: 1 }}>
            <Typography variant="h4">
              Edit item images
            </Typography>
            <ImageList
              id={`image-list`}
              cols={5}
              sx={{paddingLeft: 2, paddingRight: 2, minHeight: DISPLAY_HEIGHT }}
              rowHeight={DISPLAY_HEIGHT}
            >
              {images.map((image) => (
                <ImageListItem key={`image-list-item-${image.name}`}>
                  <img
                    alt=''
                    src={image.imageUrl}
                    style={{ height: DISPLAY_HEIGHT }}
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
                        sx={{color: 'white'}}
                        onClick={() => handleDeleteImage(image)}
                      >
                        <Close/>
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
              {images.length < MAX_IMAGES &&
                <Grid
                  container
                  direction='column'
                  sx={{
                    width: '100%',
                    height: DISPLAY_HEIGHT,
                    justifyContent: 'center',
                    alignContent: 'center',
                    justifySelf: 'center',
                    alignSelf: 'center',
                    border: '4px lightgreen solid',
                    borderRadius: 2,
                    cursor: 'pointer',
                  }}
                  onClick={handleOpenDialog}
                >
                  <Grid item sx={{ alignSelf: 'center' }}>
                    <Add fontSize='large' sx={{ color: 'grey' }} />
                  </Grid>
                  <Grid item>
                    <Typography variant='h5'>
                      Add {images.length > 0 ? 'more ' : ''}images
                    </Typography>
                  </Grid>
                </Grid>
              }
            </ImageList>
          </StyledForm>
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          sx={{ minWidth: 600 }}
        >
          <DialogTitle variant='h3'>
            Upload additional images
          </DialogTitle>
          <DialogContent>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
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
                  border: '4px grey solid',
                  borderRadius: 2,
                  cursor: 'pointer',
                }}
                onClick={handleClick}
              >
                <input
                  id='file-upload'
                  type="file"
                  multiple
                  style={{display: 'none'}}
                  accept=".jpg, .jpeg, .png"
                  onChange={handleUpload}
                />
                <Grid item alignSelf='center'>
                  <Add fontSize='large' sx={{color: 'grey'}}/>
                </Grid>
                <Grid item>
                  <Typography variant='h5'>
                    Drag & drop your files here
                  </Typography>
                </Grid>
                <Grid item sx={{alignSelf: 'center'}}>
                  <Typography>
                    Or click to browse your device
                  </Typography>
                </Grid>
              </Grid>
            </div>
              <Box sx={{maxHeight: 300, overflowY: 'auto'}}>
                <FileList files={files} handleDelete={handleDeleteFile}/>
              </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>
            Close
            </Button>
            {files.length > 0 &&
              <Button variant='contained' onClick={handleUpdateImages}>
                Add {files.length} image{files.length > 1 && 's'}
              </Button>
            }
          </DialogActions>
        </Dialog>
      </>
  )
}