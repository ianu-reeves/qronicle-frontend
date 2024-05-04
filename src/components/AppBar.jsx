import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import {Box, Button, IconButton, Link, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import UserContext from "../context/AuthProvider";

export default function PrimaryAppBar() {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser)
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Box flexGrow='1'>
          <Link
            color="inherit"
            href='/'
            variant='h4'
            underline='none'
            sx={{ flexGrow: 1 }}
          >
            QRonicle
          </Link>
        </Box>
        {currentUser
          ? <Typography variant="body2">Hello, {currentUser.username}</Typography>
          : <Button variant="outline" href='/login'>Log in</Button>
        }
      </Toolbar>
    </AppBar>
  );
};
