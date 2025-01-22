import {useNavigate, useSearchParams} from "react-router-dom";
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography
} from "@mui/material";
import StyledForm from "../components/StyledForm";
import SearchIcon from "@mui/icons-material/Search";
import TagInput from "../components/TagInput";
import {Field, Form, Formik} from "formik";
import React, {useEffect, useRef, useState} from "react";
import ValidatedTextField from "../components/ValidatedTextField";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ItemGrid from "../components/ItemGrid";
import {getPublicURL, sortItems} from "../util/utils";
import {ContentCopy} from "@mui/icons-material";

const gridItemStyling = {
  width: '100%',
  marginTop: 1,
  marginBottom: 1,
};

// Restricts value of page size parameter to one of allowed values
const bindPageSize = (value) => {
  value = parseInt(value);
  if (
    value === 24
    || value === 48
    || value === 96
  ) {
    return value;
  }

  return 24;
};

// Restricts value of sort method parameter to one of allowed values
const bindSortMethod = (value) => {
  if (
    value === 'date_asc'
    || value === 'name_desc'
    || value === 'name_asc'
  ) {
    return value;
  }

  return 'date_desc'
};

const SEARCH_ENDPOINT_PREFIX = '/api/v1/items/search?';

export default function Search() {
  const axios = useAxiosPrivate();
  const [items, setItems] = useState([]);
  const [params] = useSearchParams();
  const [pageSize, setPageSize] = useState(bindPageSize(params.get('pageSize')));
  const [sortMethod, setSortMethod] = useState(bindSortMethod(params.get('sortMethod')));
  const [page, setPage] = useState(parseInt(params.get('page')) || 1);
  const [resultCount, setResultCount] = useState(0);
  const [searchUrl, setSearchUrl] = useState('');
  let term = params.get('term');
  let tags = params.getAll('tag');

  const formRef = useRef();

  //TODO: complete work on pagination
  //TODO: if page > 1 when new term is entered & has fewer than 1 page of results, pagination component out of range

  useEffect(() => {
    term = formRef.current?.values.searchTerm;
    tags = formRef.current?.values.tags;
    if (!((term === null || term === '') && tags.length === 0)) {
      const searchParamString = getSearchParamString({searchTerm: term, tags})
      setSearchUrl(`${getPublicURL()}/items/search?${searchParamString}`);
      const url = SEARCH_ENDPOINT_PREFIX + searchParamString;
      axios
        .get(url)
        .then(res => {
          const {totalResults, items } = res.data;
          setResultCount(totalResults);
          setItems(items.sort(sortItems(sortMethod)));
          if (!((totalResults/ items.length) > 1)) {
            setPage(1);
          }

        })
        .catch(e => console.log(e));
    }
  }, [page]);

  const getSearchParamString = (values) => {
    let url = '';
    if (values.searchTerm) {
      url = url + `term=${values.searchTerm}`;
    }
    url = url + `&pageSize=${pageSize}&page=${page <= 0 ? 0 : page-1}&sortMethod=${sortMethod}`;
    if (values.tags) {
      values.tags.forEach((tag) => {
        url = url + `&tag=${tag}`;
      })
    }

    return url;
  };

  const handleSubmitSearch = (values) => {
    if (values.searchTerm === '' && values.tags.length === 0) {
      return;
    }
    setPage(1);
    const searchParamString = getSearchParamString(values);
    setSearchUrl(`${getPublicURL()}/items/search?${searchParamString}`);
    const url = SEARCH_ENDPOINT_PREFIX + searchParamString;
    axios
      .get(url)
      .then(res => {
        setResultCount(res.data.totalResults);
        setItems(res.data.items.sort(sortItems(sortMethod)));
      })
      .catch(e => console.log(e));
  };

  return (
    <Formik
      initialValues={{
        searchTerm: term || '',
        tags,
        sortMethod,
        pageSize,
        page
      }}
      onSubmit={handleSubmitSearch}
      innerRef={formRef}
    >{formik => (
      <Form>
        <StyledForm
          paperStyle={{
            maxWidth: '75%',
            margin: 2,
            padding: 2,
          }}
        >
          <Grid item>
            <Typography variant='h3'>
              Item search
            </Typography>
          </Grid>
          <Grid item sx={gridItemStyling}>
            <Field
              name='searchTerm'
              helperText='Search items by item name'
              placeholder='Search items'
              fullWidth
              sx={{width: '90%'}}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {

                  handleSubmitSearch(formik.values)
                }
              }}
              component={ValidatedTextField}
              InputProps={{
                startAdornment: <SearchIcon/>,
              }}
            />
          </Grid>
          <Grid item sx={{marginTop: 1, marginBottom: 1, width: '90%'}}>
            <Grid container>
              <Grid
                item
                alignSelf='flex-start'
                sx={{width: '10%'}}>
                <FormControl fullWidth>
                  <InputLabel id='result-count-select-label'>Results</InputLabel>
                  <Select
                    name='pageSize'
                    labelId='result-count-select-label'
                    id='result-count-select'
                    value={pageSize}
                    label='Results'
                    onChange={(e) => setPageSize(e.target.value)}
                  >
                    <MenuItem value={24}>24</MenuItem>
                    <MenuItem value={48}>48</MenuItem>
                    <MenuItem value={96}>96</MenuItem>
                  </Select>
                  <FormHelperText>Per page</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item sx={{marginLeft: '5%', width: '30%'}}>
                <FormControl fullWidth>
                  <InputLabel id='sort-order-select-label'>Sort by</InputLabel>
                  <Select
                    name='sortMethod'
                    labelId='sort-order-select-label'
                    id='sort-order-select'
                    value={sortMethod}
                    label='Sort by'
                    onChange={(e) => setSortMethod(e.target.value)}
                  >
                    <MenuItem value='name_desc'>Name (DESC)</MenuItem>
                    <MenuItem value='name_asc'>Name (ASC)</MenuItem>
                    <MenuItem value='date_asc'>Oldest first</MenuItem>
                    <MenuItem value='date_desc'>Newest first</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sx={{marginLeft: '5%', width: '50%'}}>
                <Field
                  name="tags"
                  helperText='Search for items by tag(s)'
                  component={TagInput}
                  maxTags={50}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ marginBottom: 1 }}>
            <Button variant='contained' type='submit'>
              Search
            </Button>
          </Grid>
          <Divider sx={{minWidth: '100%', margin: 1}}/>
          <Grid item alignSelf='flex-start'>
            <Typography variant='h5'>
              Results:
            </Typography>
          </Grid>
          {resultCount > 0 &&
            <Grid item>
              <Button
                // variant='outlined'
                startIcon={<ContentCopy />}
                onClick={() => navigator.clipboard.writeText(searchUrl)}
              >
                Copy query to clipboard
              </Button>
            </Grid>
          }
          <Grid item>
            {items.length > 0
              ? (<>
                <Typography variant='subtitle1'>
                  Displaying results {pageSize * (page - 1) + 1}-{pageSize * page <= resultCount? pageSize * page : resultCount} of {resultCount} total results
                </Typography>
                <ItemGrid items={items} />
              </>)
              : <Grid item>
                <Typography>
                  Your search returned no results
                </Typography>
              </Grid>
            }
          </Grid>
          {resultCount/ pageSize > 1 &&
            <Grid item>
              <Pagination
                name='page'
                count={Math.ceil(resultCount / pageSize)}
                color='primary'
                defaultPage={page}
                showFirstButton
                showLastButton
                onChange={(_, v) => setPage(v)}
              />
            </Grid>
          }
        </StyledForm>
      </Form>
    )}
    </Formik>
  );
};
