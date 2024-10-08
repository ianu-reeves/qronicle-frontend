import React from 'react';
import AppBar from '@mui/material/AppBar';
import {Box, Button, Drawer, IconButton, Link, List, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import useAuth from "../hooks/useAuth";
import SearchBar from "./SearchBar";
import {Home, MeetingRoom, Person, Queue} from "@mui/icons-material";
import DrawerItem from "./DrawerItem";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {toast} from "react-toastify";
import {NavLink, useNavigate} from "react-router-dom";

export default function PrimaryAppBar() {
  const { currentUser } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const username = currentUser?.username;

  // TODO: sort out issue where access/ refresh cookies are not sent after access token expires
  const handleSignOut = () => {
    axiosPrivate
      .post('/auth/signout', null, { withCredentials: true })
      .then(result => {
        if (result.status === 204) {
          toast.success('Signed out successfully');
          navigate('/login');
        } else {
          toast.error('An error occurred. Please try again');
        }
      })
      .catch(e => console.log('ERROR', e))
  };

  return (
    <AppBar position='sticky'>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <IconButton onClick={() => setOpen(!open)}>
          <MenuIcon />
        </IconButton>
        <Box flexGrow='1'>
          <NavLink
            to='/'
            style={{ fontSize: '35px', textDecoration: 'none', color: 'white' }}
          >
            QRonicle
          </NavLink>
        </Box>
        <SearchBar placeholder="Search items" />
        {Object.keys(currentUser).length > 0
          ? <Typography variant="body2">
            Hello, <NavLink to={`/profile/${username}`} style={{ textDecoration: 'none', color: 'white' }}>
              {username}
            </NavLink>
            </Typography>
          : <Button variant="outline" href='/login'>Log in</Button>
        }
      </Toolbar>
      {currentUser &&
        <Drawer open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: 250 }}>
            <List>
              <DrawerItem icon={<Home />} label='Home' href='/' />
              <DrawerItem icon={<Queue />} label='Add New Item' href='/items/create' />
              <DrawerItem icon={<Person />} label='My Profile' href={`/profile/${currentUser?.username}`} />
              <DrawerItem icon={<MeetingRoom />} label='Sign Out' onClick={handleSignOut} />
            </List>
          </Box>
      </Drawer>
      }
    </AppBar>
  );
};
