import React, {useEffect} from 'react';
import {toast} from "react-toastify";
import ItemForm from "../components/ItemForm";
import {useParams} from "react-router-dom";
import { Typography } from "@mui/material";
import ImageGrid from "../components/ImageGrid";
import StyledForm from "../components/StyledForm";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function EditItem() {
  const { itemId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [item, setItem] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const MAX_FILE_SIZE = 1048576 * 10;  // 10 MB

  useEffect(() => {
    axiosPrivate
      .get(`/api/v1/items/${itemId}`, { withCredentials: true })
      .then(results => {
        setItem(results.data)
        setLoading(false);
      })
      .catch(() => {console.log('error')})
  }, [axiosPrivate, itemId]);

  const handleSubmit = async (values) => {
    // const form = new FormData();
    // const itemForm = { id: item?.id, name: values.name, description: values.description, tags: values.tags }
    // console.log('ITEMFORM: ', itemForm)
    // form.append("item", new Blob([JSON.stringify(itemForm)], { type: 'application/json' }))
    // values.images.forEach((image) => form.append('files', image));
    axiosPrivate
      .put('/api/v1/items', values, { withCredentials: true })
      .then((result) => {
        setItem(result.data);
        toast.success('Item updated successfully!');
      })
      .catch(() => {});
  };

  const handleFileDrop = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.size > MAX_FILE_SIZE && toast.error('Files may not be more than 10MB each');
    }
  };

  return (
    loading
      ? <Typography>Loading...</Typography>
      : <>
        <ItemForm handleSubmit={handleSubmit} handleFileDrop={handleFileDrop} item={item}/>
        {item?.images.length > 0 &&
          <StyledForm paperStyle={{ paddingTop: 3, paddingBottom: 3, width: '50%', marginTop: 1}}>
            <Typography variant="h5">
              Adjust images
            </Typography>
            <ImageGrid item={item} width={5} />
          </StyledForm>
        }
        </>
  )
}