import React from "react";
import { toast } from "react-toastify";
import ItemForm from "../components/ItemForm";
import {useNavigate} from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// TODO: Fix issues with file select upload flow
export default function CreateItem() {
  const MAX_FILE_SIZE = 1048576 * 10;  // 10 MB
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setFieldError, resetForm }) => {
    const form = new FormData();
    const itemForm = { name: values.name, description: values.description, tags: values.tags }
    form.append("itemForm", new Blob([JSON.stringify(itemForm)], { type: 'application/json' }))
    values.images.forEach((image) => form.append("files", image));

    await axiosPrivate
      .post('/api/v1/items', form, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((result) => {
        resetForm();
        toast("Item added!");
        navigate("/", { replace: true });
      })
      .catch((e) => {console.log(e)});
  };

  const handleFileDrop = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.size > MAX_FILE_SIZE && toast.error('Files may not be more than 10MB each');
    }
  };

  return (
    <ItemForm handleSubmit={handleSubmit} handleFileDrop={handleFileDrop} />
  );
};
