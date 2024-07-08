import {Avatar, Button} from "@mui/material";
import React from "react";

export default function LinkedLogoButton({ avatarSize, src, href, buttonText }) {
  return (
    <Button
      variant="outlined"
      startIcon={<Avatar sx={{ width: avatarSize, height: avatarSize }} src={src} />}
      component="a"
      href={href}
    >
      {buttonText}
    </Button>
  )
}