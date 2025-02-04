import React, {useEffect} from "react";
import {
  Autocomplete,
  Chip, MenuItem,
  TextField,
} from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {History} from "@mui/icons-material";

const sortTagsByRecent = (a, b) => {
  const history = JSON.parse(localStorage.getItem('recent_tags'));
  if (history.includes(a)) {
    return -1;
  }
  if (history.includes(b)) {
    return 1;
  }
  return 0;
}

const sortRecentTags = (a, b) => {
  const recent = localStorage.getItem('recent_tags') || [];
  if (recent.indexOf(a) < 0 || recent.indexOf(b) < 0) return 0;
  if (recent.indexOf(a) < recent.indexOf(b)) return -1;
  return 1;
};

export default function TagInput({ form, field, maxTags, ...textFieldProps }) {
  const axiosPrivate = useAxiosPrivate();
  const [selected, setSelected] = React.useState(0);
  const [options, setOptions] = React.useState(JSON.parse(localStorage.getItem('recent_tags')) || []);

  useEffect(() => {
    axiosPrivate
      .get('/api/v1/tags')
      .then((results) => {
        const tags = results.data.map(tag => tag.description).sort(sortTagsByRecent).sort(sortRecentTags);
        setOptions(tags);
      })
      .catch(() => {});
  }, []);

  const addTagToRecentlyUsed = (val) => {
    let history = JSON.parse(localStorage.getItem('recent_tags')) || [];

    if (!history.includes(val)) {
      history.splice(0, 0, val);
      if (history.length > 5) {
        history.splice(5, 1);
      }
    }

    localStorage.setItem('recent_tags', JSON.stringify(history));
    options.sort(sortTagsByRecent).sort(sortRecentTags);
  };

  const handleTagSearch = (val) => {
    if (val.length > 3) {
      axiosPrivate
        .get(`/api/v1/tags/${val}`)
        .then(res => setOptions(res.data.map(tag => tag.description).sort(sortTagsByRecent)))
    }
  };

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
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <MenuItem
            key={key}
            {...optionProps}
            onClick={(e) => {
              addTagToRecentlyUsed(e.target.textContent);
              optionProps.onClick(e)
            }}
          >
            {JSON.parse(localStorage.getItem('recent_tags'))?.includes(option) && <History sx={{ marginRight: 1, marginLeft: -1.5 }} />}
            {option}
          </MenuItem>
        );
      }}
      onChange={(event, newValue) => onChange(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          fullWidth
          // sx={{ maxWidth: '75%' }}
          label={`Add tags (max ${maxTags})`}
          onChange={(e) => handleTagSearch(e.target.value)}
        />
      )}
      options={options.slice(0, 10)}

    />
  );
};
