import {Box, Drawer, IconButton, Menu, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MainMenuDrawerContents from "./MainMenuDrawerContents";

export default function MainMenu() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <>
      <IconButton onClick={() => toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        <MainMenuDrawerContents />
      </Drawer>
    </>
  );
};
