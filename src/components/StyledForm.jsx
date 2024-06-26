import {Grid, Paper, TextField} from "@mui/material";

export default function StyledForm({ children }) {
  return (
    <Grid
      justifyContent="center"
      alignItems="center"
      container
      direction="column"
    >
      <Paper
        component={Grid}
        sx={{ paddingTop: 3, paddingBottom: 3, width: '50%', marginTop: '10%' }}
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
