import {Avatar, Button} from "@mui/material";
import React from "react";

export default function LinkedLogoButton({ avatarSize, src, buttonText, ...props }) {
  return (
    <Button
      variant="outlined"
      startIcon={<Avatar sx={{ width: avatarSize, height: avatarSize }} src={src} />}
      component="a"
      {...props}
    >
      {buttonText}
    </Button>
  )
}