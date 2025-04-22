import {Grid, Typography} from "@mui/material";
import StyledForm from "./StyledForm";
import '@fontsource/oswald'
import UndecoratedNavLink from "./UndecoratedNavLink";

export default function EmptyHomePage() {

  return (
    <StyledForm
      paperStyle={{
        maxWidth: '75%',
        marginTop: 2,
        padding: 1,
      }}
    >
      <Grid item sx={{ marginBottom: 2 }}>
        <Typography variant='h2' sx={{ fontStyle: 'bold' }}>
          There's nothing here... yet!
        </Typography>
      </Grid>
      <Grid item sx={{ marginBottom: 2 }}>
        <Typography variant='h6'>
          But you can change that! After you upload items, they will be visible here on your home page and on your profile
        </Typography>
      </Grid>
      <Grid item sx={{ marginBottom: 2 }}>
        <Typography variant='h6'>
          <UndecoratedNavLink to={'/items/create'}>Click here</UndecoratedNavLink> to start chronicling your memories today & ensure you never forget the small things that
          enrich your life
        </Typography>
      </Grid>
      <Grid item sx={{ marginBottom: 2 }}>
        <Typography variant='h6'>
          Need some inspiration? Check out what other users have uploaded by using the search bar at the top of the screen! For example, try searching for 'hoya' to see what some plant lovers have uploaded
        </Typography>
      </Grid>
    </StyledForm>
  );
};
