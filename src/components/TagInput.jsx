import React, {useEffect} from "react";
import {
  Autocomplete,
  Chip,
  TextField,
} from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


export default function TagInput({ form, field, maxTags }) {
  const axiosPrivate = useAxiosPrivate();
  const [selected, setSelected] = React.useState(0);
  const [options, setOptions] = React.useState([]);
  useEffect(() => {
    axiosPrivate
      .get('http://localhost:8080/api/v1/tags',
        { withCredentials: true }
      )
      .then(results => setOptions(results.data.map(tag => tag.description)))
      .catch(() => {});
  }, []);
  const onChange = (newValue) => {
    field.value = newValue;
    form.setFieldValue("tags", newValue)
    setSelected(form.values.tags.length);
  };
  //TODO: add listbox customization
  // and virtualization
  return (
    <Autocomplete
      freeSolo
      multiple
      disabled={selected >= maxTags}
      value={field.value}
      renderTags={(values, getTagProps) =>
        values.map((option, index) => {
          const { key, ...tagProps } = getTagProps({ index });
          return (
            <Chip label={option} key={key} {...tagProps} disabled={false} />
          );
        })
      }
      onChange={(event, newValue) => onChange(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          sx={{ maxWidth: '75%' }}
          label={`Add tags (max ${maxTags})`}
        />
      )}
      options={options}
    />
  );
};
