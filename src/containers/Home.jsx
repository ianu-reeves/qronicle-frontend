import {useEffect, useState} from 'react';
import axios from "axios";
import Item from "../components/Item";
import { Grid } from "@mui/material";

export default function Home() {
  const [items, setItems] = useState([]);
  const fetchImages = (item) => {
    return axios
      .get(`http://localhost:8080/items/${item.id}/images`)
      .then(images => {
        return images.data;
      });
  };

  useEffect(() => {
    let newItems = [];
    axios
      .get('http://localhost:8080/items/user/busteduser')
      .then(results => {
        results.data.forEach(item => {
          fetchImages(item).then(results => {
            item.images = results;
            newItems = newItems.concat(item);
          }).then(() => setItems(newItems))
        });
      })
      .catch(() =>
        console.log('An error occurred while trying to fetch item data.')
      );
    },
  []
  );

  //TODO: extract item grid to separate component for reuse in e.g. item search page
  return (
    <>
      <Grid container margin="2%" spacing={3}>
        {items.map(item => <Item key={item.id} itemProperties={item} />)}
      </Grid>
    </>
  );
};
