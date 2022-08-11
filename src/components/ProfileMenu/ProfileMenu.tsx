import React from "react";
import { useRouter } from "next/router";

import { 
  Box, 
  Divider, 
  IconButton, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography
} from "@mui/material";
import { PersonOutlined, SettingsOutlined, LogoutOutlined } from "@mui/icons-material";

import CustomMuiMenu from "@components/CustomMuiMenu";

import { useAppDispatch, useAppSelector } from "@redux/store";
import { logout } from "@redux/auth/actions";

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
      
      <CustomMuiMenu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{ 
          sx: { width: { xs: 200, sm: 300, md: 400 } } 
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Welcome to energy monitor !</Typography>
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
      </CustomMuiMenu>
    </>
  )
}

export default ProfileMenu;
