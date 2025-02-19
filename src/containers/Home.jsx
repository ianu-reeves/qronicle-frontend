import React, { useEffect, useState } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import ItemGrid from "../components/ItemGrid";
import EmptyHomePage from "../components/EmptyHomePage";
import {toast} from "react-toastify";
import LoadingData from "../components/LoadingData";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const axios = useAxiosPrivate();

  const handleDeleteItem = (item) => {
    axios
      .delete(`/api/v1/items/${item.id}`)
      .then(() => {
        setItems(items.filter(i => i.id !== item.id));
        toast.success('Item deleted!');
      })
      .catch(() => {});
  };

  useEffect(() => {
    axios
      .get(`/api/v1/items/user/${currentUser?.username}`)
      .then(results => {
        setItems(results.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    },
  [currentUser?.username, axios]
  );

  return (loading
    ? <LoadingData />
    : items.length > 0
      ? <ItemGrid items={items} onDeleteItem={handleDeleteItem} />
      : <EmptyHomePage />
  );
};
