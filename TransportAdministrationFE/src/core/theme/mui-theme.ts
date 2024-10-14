import { createTheme } from '@mui/material';
import { green } from '@mui/material/colors';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: green[800],
      dark: green[900],
      light: green[400],
    },
  },
});
