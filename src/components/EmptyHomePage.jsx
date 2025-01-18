import {createTheme, Grid, ThemeProvider, Typography} from "@mui/material";
import StyledForm from "./StyledForm";
import '@fontsource/oswald'

export default function EmptyHomePage() {
  const typographyTheme = createTheme({
    typography: {
      fontFamily: ['Oswald', 'sans-serif'].join(','),
      fontWeightBold: '700',
    }
  });

  return (
    <ThemeProvider theme={typographyTheme}>
    <StyledForm
      paperStyle={{
        maxWidth: '75%',
        marginTop: 2,
        padding: 1,
      }}
    >
      <Grid item>
        <Typography variant='h2' sx={{ fontStyle: 'bold' }}>
          There's nothing here...
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant='h4'>
          ...but you can change that! After you upload items, you can view them here on your home page
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant='h4'>
          Need a hand getting started? Click here for a quick run through of the process
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant='h4'>
          Click here to start chronicling your memories today & ensure you never forget the small things that
          enrich your life
        </Typography>
      </Grid>
    </StyledForm>
    </ThemeProvider>
  );
};
