import React from "react";

import { 
  alpha, 
  Badge, 
  Box, 
  Divider, 
  IconButton, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Menu, 
  MenuProps, 
  Stack, 
  styled, 
  Typography
} from "@mui/material";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import { PersonOutlined } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@redux/store";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import { useRouter } from "next/router";
import { logout } from "@redux/auth/actions";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    // minWidth: 200,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));
interface ProfileMenuProps {}

const ProfileMenu = ({}: ProfileMenuProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(state => state.auth.user);
    
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size='small' aria-label={'App Notifications'} onClick={handleClick}>
        <PersonOutlined />
      </IconButton>
      
      <StyledMenu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{ 
          sx: { width: { xs: 200, sm: 300, md: 400 } } 
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Welcome to engy !</Typography>
          <Typography variant="caption">{loggedInUser?.email ?? ""}</Typography>
        </Box>
        <Divider />
        <ListItemButton
          onClick={() => {
            if (!loggedInUser) return;
            router.push(loggedInUser.role.includes('admin') ? '/admin/dash/settings' : '/dash/settings')
            handleClose();
          }}
        >
          <ListItemIcon>
            <SettingsOutlined/>
          </ListItemIcon>
          <ListItemText
            primary="Settings"
          />
        </ListItemButton>
        <Divider />
        <ListItemButton 
          onClick={async () => {
            if(!loggedInUser) return;
            try {
              const res = await dispatch(logout({})).unwrap();  
              console.log(res);
              router.push(loggedInUser.role.includes('admin') ? '/admin/auth/login' : '/auth/login')
              handleClose();
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <ListItemIcon>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
          />
        </ListItemButton>
      </StyledMenu>
    </>
  )
}

export default ProfileMenu;
