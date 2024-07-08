import { useEffect, useState } from 'react';
import ItemCard from "../components/ItemCard";
import { Grid } from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Home() {
  const [items, setItems] = useState([]);
  const { currentUser } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get(`http://localhost:8080/api/v1/items/user/${currentUser.username}`,
        {
          withCredentials: true,
        })
      .then(results => {
        setItems(results.data)
      })
      .catch(() => {
      });
    },
  [currentUser?.username, axiosPrivate]
  );
  console.log(items)

  //TODO: extract item grid to separate component for reuse in e.g. item search page
  return (
    <>
      <Grid
        container
        justifyContent='center'
      >
        <Grid
          container
          justifyContent='center'
          rowSpacing={2}
          columnSpacing={2}
          sx={{ margin: 2 }}
        >
          {items.map(item =>
            <Grid
              key={`${item.id}-grid`}
              item xs={4}
            >
              <ItemCard itemProperties={item} />
            </Grid>
          )}
        </Grid>
      </Grid>
      <Link to="/items/create">Item creation</Link>
    </>
  );
};
