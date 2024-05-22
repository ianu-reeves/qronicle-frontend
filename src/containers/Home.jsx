import {useEffect, useState} from 'react';
import axios from "axios";
import Item from "../components/Item";
import {Button, Grid} from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function Home() {
  const [items, setItems] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchImages = (item) => {
      return axiosPrivate
        .get(`http://localhost:8080/api/v1/items/${item.id}/images`,
          {
            withCredentials: true,
          })
        .then(images => {
          return images.data;
        });
    };
    let newItems = [];
    axiosPrivate
      .get('http://localhost:8080/api/v1/items/user/busteduser',
        {
          withCredentials: true,
        })
      .then(results => {
        results.data.forEach(item => {
          fetchImages(item).then(results => {
            item.images = results;
            newItems = newItems.concat(item);
          }).then(() => setItems(newItems))
        });
      })
      .catch(() => {
      });
    },
  [axiosPrivate]
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
