import React, {useEffect, useState} from 'react';
import {Button, Grid, Typography} from "@mui/material";
import StyledForm from "../components/StyledForm";
import {useNavigate, useParams} from "react-router-dom";
import ItemGrid from "../components/ItemGrid";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import {Edit} from "@mui/icons-material";
import {convertDateWithLongMonth} from "../util/utils";
import {toast} from "react-toastify";
import LoadingData from "../components/LoadingData";

export default function ProfilePage() {
  const { username } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const axios = useAxiosPrivate();
  const [user, setUser] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [fetchedItems, setFetchedItems] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`api/v1/users/${username}`)
      .then(data => {
        setUser(data.data);
        setLoading(false);
      })
      .catch(err => {
        if(err.response.status === 404) {
          navigate('/');
        }
      });
  }, [username]);

  const handleDeleteItem = (item) => {
    axios
      .delete(`/api/v1/items/${item.id}`)
      .then(() => {
        setItems(items.filter(i => i.id !== item.id));
        toast.success('Item deleted!');
      })
      .catch(() => {});
  };

  const loadItems = () => {
    setLoadingItems(true);
    axios
      .get(`/api/v1/items/user/${username}`)
      .then(results => {
        setItems(results.data);
        setFetchedItems(true);
        setLoadingItems(false);
      })
      .catch(() => {});
  }

  return (
    loading
      ? <LoadingData />
      : <StyledForm paperStyle={{width: '75%', marginTop: 2}}>
        <Grid item>
          <Typography variant='h3'>{user?.username}</Typography>
        </Grid>
        {currentUser.username === username &&
          <Button variant='outlined' startIcon={<Edit />} href='/profile/edit'>
            Edit profile
          </Button>
        }
        <Grid item justifySelf='flex-start'>
          <Grid container direction='column'>
            <Grid item>
              <Typography id='profile-first-name'>
                First name: {user?.firstName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography id='profile-last-name'>
                Last Name: {user?.lastName}
              </Typography>
            </Grid>
            {currentUser.username === username &&
              <Grid item>
                <Typography id='profile-email'>
                  Email address: {user?.email}
                </Typography>
              </Grid>
            }
            <Grid item>
              <Typography id='profile-signup-date'>
                Member since {convertDateWithLongMonth(user?.signupDate)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography id='profile-bio'>
                {user?.bio ? `About me: ${user?.bio}` : `${user.username} hasn't written a bio yet`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{marginBottom: 2}}>
          {loadingItems
            ? <LoadingData />
            : items.length > 0
              ? <ItemGrid items={items} onDeleteItem={handleDeleteItem} />
              : fetchedItems
                ? <Typography variant='h5'>
                  This user has not uploaded any items yet.
                </Typography>
                : <Button variant='contained' onClick={loadItems}>
                  Load items
                </Button>
          }
        </Grid>
      </StyledForm>
  )
}
