import { Theme } from "@mui/material";

export const components: Theme['components'] = {
  MuiPaper: {
    defaultProps: { variant: 'outlined' }
  },
  MuiButton: {
    defaultProps: { variant: 'outlined', sx: { borderRadius: 2 } }
  },
  MuiTextField: {
    defaultProps: { size: 'small', InputProps: { sx: { borderRadius: 2 } }  },
  },
  MuiSelect: {
    defaultProps: {
      size: 'small',
      sx: { borderRadius: 2 }
    }
  }
}
