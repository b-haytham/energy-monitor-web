import { createTheme } from '@mui/material/styles';
import typography from './typography';
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
  },
  typography,
});

export default theme;
