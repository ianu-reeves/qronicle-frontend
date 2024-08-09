import React from 'react';
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import {useEffect} from "react";
import ItemCard from "../components/ItemCard";
import {Close} from "@mui/icons-material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ItemPage = () => {
  const { itemId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [item, setItem] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(null);

  const handleImageClick = (image) => {
    setImageUrl(image.imageUrl);
    setModalOpen(true);
  };

  useEffect(() => {
    axiosPrivate
      .get(`/api/v1/items/${itemId}`, { withCredentials: true })
      .then(result => {
        console.log(result)
        setItem(result.data)
      })
    .catch(() => {});
  }, []);

  return (
    <div style={{ padding: 10 }}>
      {item !== null && <ItemCard itemProperties={item} onClickImage={handleImageClick} />}
      <Dialog
        open={modalOpen}
        fullWidth
        maxWidth={'xl'}
        onClose={() => setModalOpen(false)}
      >
        <DialogTitle>{item?.name}</DialogTitle>
        <IconButton
          onClick={() => setModalOpen(false)}
          sx={{
            position: 'absolute',
            right: 15,
            top: 15
          }}
        >
          <Close />
        </IconButton>
        <DialogContent>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item>
              <img
                src={imageUrl}
                style={{ width: 800, maxWidth: '100%', height: 'auto' }}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ItemPage;
