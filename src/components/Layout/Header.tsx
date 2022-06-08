import { AppBar, Toolbar, Typography } from "@mui/material";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  return (
    <AppBar 
      position='fixed' 
      variant="outlined" 
      elevation={0} 
      color="inherit"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Engy
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
