import {Grid, Paper, TextField} from "@mui/material";

export default function StyledForm({ children, paperStyle }) {
  return (
    <Grid
      justifyContent="center"
      alignItems="center"
      container
      direction="column"
    >
      <Paper
        component={Grid}
        sx={paperStyle}
        justifyContent="center"
        alignItems="center"
        container
        direction="column"
        rowSpacing={1}
      >
        {children}
      </Paper>
    </Grid>
  );
};
