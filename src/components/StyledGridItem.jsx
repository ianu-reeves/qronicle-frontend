import {Grid} from "@mui/material";

export default function StyledGridItem({ children, style }) {
  return (
    <Grid item sx={{...style, width: '100%', marginTop: '1%', marginBottom: '1%' }}>
      {children}
    </Grid>
  );
};
