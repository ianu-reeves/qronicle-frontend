import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";

const DrawerItem = ({ icon, label, href, onClick }) => {

  return (
    <ListItem key={`drawer-item-${label}`}>
      <ListItemButton href={href} onClick={onClick}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText>
          {label}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default DrawerItem;
