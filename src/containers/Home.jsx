import { useEffect, useState } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import ItemGrid from "../components/ItemGrid";
import {Typography} from "@mui/material";
import EmptyHomePage from "../components/EmptyHomePage";

export default function Home() {
  const [items, setItems] = useState([]);
  const { currentUser } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get(`http://localhost:8080/api/v1/items/user/${currentUser?.username}`,
        {
          withCredentials: true,
        })
      .then(results => {
        setItems(results.data)
      })
      .catch(() => {});
    },
  [currentUser?.username, axiosPrivate]
  );

  return (items.length > 0
      ? <ItemGrid items={items} />
      : <EmptyHomePage />
  );
};
