import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {NavLink} from "react-router-dom";
import UndecoratedNavLink from "./UndecoratedNavLink";

const DrawerItem = ({ icon, label, href, onClick }) => {

  return (
    <UndecoratedNavLink to={href} color='black'>
      <ListItem key={`drawer-item-${label}`}>
        <ListItemButton onClick={onClick}>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText>
            {label}
          </ListItemText>
        </ListItemButton>
      </ListItem>
    </UndecoratedNavLink>
  );
};

export default DrawerItem;
