import React from "react";

import { 
  Badge, 
  Divider, 
  IconButton, 
  Stack, 
  Typography, 
  Box,
} from "@mui/material";
import { NotificationsActiveOutlined } from "@mui/icons-material";

import AppNotificationListItem from "./AppNotificationListItem";
import CustomMuiMenu from "@components/CustomMuiMenu";

import { useAppDispatch, useAppSelector } from "@redux/store";
import { 
  deleteAppNotification, 
  markReadAppNotification 
} from "@redux/global/globalSlice";


interface AppNotificationsMenuProps {}

const AppNotificationsMenu = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(state => state.global.notifications);
  // const devices = useAppSelector(state => state.devices.devices);

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
        <Badge badgeContent={notifications.filter(not => !not.read).length} color="primary">
          <NotificationsActiveOutlined />
        </Badge>
      </IconButton>
      <CustomMuiMenu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{ 
          sx: { width: { xs: 300, sm: 400, md: 500 }, maxHeight: 600 } 
        }}
      >
        <Stack direction="row" justifyContent="space-between" sx={{ p: 2 }}>
          <Typography variant="h6">Notifications</Typography>
        </Stack>
        <Divider />
        {notifications.length == 0 && (
          <Box sx={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="body1">No Notifications</Typography>
          </Box>
        )}
        {notifications.length > 0 && notifications.map((notification) => (
          <AppNotificationListItem 
            key={notification.id} 
            notification={notification} 
            onMarkReadClick={() => dispatch(markReadAppNotification(notification.id))}
            onDeleteClick={() => dispatch(deleteAppNotification(notification.id))}
          />
        ))}
      </CustomMuiMenu>
    </>
  )
}

export default AppNotificationsMenu;

