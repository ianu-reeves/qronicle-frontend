import React, {useEffect} from "react";
import {axiosPrivate} from "../api/axios";
import {
  Autocomplete,
  Chip,
  Grid,
  TextField, Typography,
} from "@mui/material";
import {toast} from "react-toastify";

const MAX_TAGS = 10;

export default function TagInput(props) {
  const [newTag, setNewTag] = React.useState('');
  const [selected, setSelected] = React.useState(0);
  const [options, setOptions] = React.useState([]);
  const { form, push, remove } = props;
  const { tags } = form.values;

  useEffect(() => {
    axiosPrivate
      .get('http://localhost:8080/api/v1/tags',
        { withCredentials: true }
      )
      .then(results => setOptions(results.data.map(tag => tag.description)))
      .catch(e => console.log(e));
  }, []);

  const onChange = (newValue) => {
    console.log('CHANGED')
    setSelected(selected + 1);
    form.values.tags = newValue;
  };

  //TODO: add listbox customization
  // and virtualization
  return (
    <Autocomplete
      freeSolo
      multiple
      disabled={selected.length >= MAX_TAGS}
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
          label="Enter tags"
        />
      )}
      options={options}
    />
  );
};
