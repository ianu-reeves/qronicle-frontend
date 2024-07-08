import React from 'react';
import { useParams } from "react-router-dom";
import {Dialog, DialogContent, DialogTitle, Grid, ImageList, ImageListItem, Typography} from "@mui/material";
import {useEffect} from "react";
import {axiosPrivate} from "../api/axios";
import ItemCard from "../components/ItemCard";

const ItemPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(null);

  const handleImageClick = (image) => {
    setImageUrl(image.imageUrl);
    setModalOpen(true);
  };

  useEffect(() => {
    axiosPrivate
      .get(`/api/v1/items/${itemId}`)
      .then(result => {
        console.log(result)
        setItem(result.data)
      })
    .catch(() => {});
  }, []);

  return (
    <div style={{ padding: 10 }}>
      {item !== null && <ItemCard itemProperties={item} onClickImage={handleImageClick} />}
      <Dialog open={modalOpen} fullWidth maxWidth={'xl'}>
        <DialogTitle>{item?.name}</DialogTitle>
        <DialogContent>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item>
              <img
                src={imageUrl}
              />
            </Grid>
          </Grid>

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ItemPage;
