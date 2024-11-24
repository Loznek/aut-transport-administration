import { createTheme } from '@mui/material';
import { green } from '@mui/material/colors';

const baseTheme = createTheme();

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: green[800],
      dark: green[900],
      light: green[400],
    },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          [baseTheme.breakpoints.up('sm')]: {
            minHeight: '3rem',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});
