import { AppBar, IconButton, Stack, Toolbar, Typography,  useMediaQuery,  useTheme } from "@mui/material";
import { MenuOutlined, ArrowBackOutlined } from "@mui/icons-material";

import AppNotificationsMenu from "@components/AppNotificationsMenu";
import ProfileMenu from "@components/ProfileMenu";

interface HeaderProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const Header = ({ open, handleOpen, handleClose }: HeaderProps) => {
  const theme = useTheme();
  const matchesDownMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar 
      position='fixed' 
      variant="outlined" 
      elevation={0} 
      color="inherit"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          {matchesDownMd && (
            <IconButton size="small" onClick={() => open ? handleClose() : handleOpen()}>
              {open ? <ArrowBackOutlined /> : <MenuOutlined />}
            </IconButton>
          )}
          <Typography variant="h6" color="inherit">
            Engy
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <AppNotificationsMenu />
          <ProfileMenu />
        </Stack>
     </Toolbar>
    </AppBar>
  )
}

export default Header;
