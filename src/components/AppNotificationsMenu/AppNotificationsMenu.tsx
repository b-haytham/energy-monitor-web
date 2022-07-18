import React from "react";
import { useRouter } from "next/router";

import { 
  alpha, 
  Badge, 
  Divider, 
  IconButton, 
  ListItem, 
  ListItemText, 
  Menu, 
  MenuProps, 
  Stack, 
  styled, 
  Typography, 
  Box,
  ListItemAvatar,
  Avatar
} from "@mui/material";
import { 
  DeleteOutlined, 
  DeleteOutlineSharp, 
  MarkChatReadOutlined, 
  CampaignOutlined, 
  InsightsOutlined, 
  NotificationsActiveOutlined 
} from "@mui/icons-material";

import Link from "@components/Link";

import { useAppDispatch, useAppSelector } from "@redux/store";
import { AppNotification, AppNotificationType, deleteAppNotification, markReadAppNotification } from "@redux/global/globalSlice";
import { User } from "@api/types/user";

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

interface AppNotificationsMenuProps {}

const AppNotificationsMenu = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(state => state.auth.user);
  const notifications = useAppSelector(state => state.global.notifications);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const learnMoreLinkRoute = (loggedInUser: User | null, notification: AppNotification) => {
    if (!loggedInUser) {
      return '/auth/login';
    }
    switch (notification.data.type) {
      case AppNotificationType.TriggeredAlert:
        return loggedInUser.role.includes('admin') ?  
          `/admin/dash/alerts/${notification.data._id}`
          : `/dash/alerts/${notification.data._id}`

      case AppNotificationType.ReportGenerated:
        return loggedInUser.role.includes('admin') ?  
          `/admin/dash/reports`
          : `/dash/reports`;

      default:
        return "/dash";
    }
  }

  console.log('App Notifications >>', notifications);
  return (
    <>
      <IconButton size='small' aria-label={'App Notifications'} onClick={handleClick}>
        <Badge badgeContent={notifications.filter(not => !not.read).length} color="primary">
          <NotificationsActiveOutlined />
        </Badge>
      </IconButton>
      <StyledMenu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{ 
          sx: { width: { xs: 200, sm: 300, md: 400 } } 
        }}
      >
        <Stack direction="row" justifyContent="space-between" sx={{ p: 2 }}>
          <Typography variant="h6">Notifications</Typography>
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <IconButton
              size="small"
              onClick={() => {}}
            >
              <MarkChatReadOutlined />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {}}
            >
              <DeleteOutlineSharp />
            </IconButton>
          </Stack>
        </Stack>
        <Divider />
        {notifications.length == 0 && (
          <Box sx={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="body1">No Notifications</Typography>
          </Box>
        )}
        {notifications.length > 0 && notifications.map(notification => (
          <ListItem 
            selected={notification.read}
            key={notification.id} 
            secondaryAction={
              <Stack direction="row" spacing={1}>
                {!notification.read && <IconButton 
                  size="small" 
                  onClick={() => dispatch(markReadAppNotification(notification.id))}
                >
                  <MarkChatReadOutlined />
                </IconButton>}
                <IconButton 
                  size="small"
                  onClick={() => dispatch(deleteAppNotification(notification.id))}
                >
                  <DeleteOutlined />
                </IconButton>
              </Stack>
            }
          >
            <ListItemAvatar>
              <Avatar>
                {notification.data.type == AppNotificationType.TriggeredAlert ? (
                  <CampaignOutlined /> 
                ) : notification.data.type == AppNotificationType.ReportGenerated ? (
                  <InsightsOutlined />
                ): null}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={notification.data.type}
              primaryTypographyProps={{ variant: "h6" }}
              secondary={<Link href={learnMoreLinkRoute(loggedInUser, notification)} >Learn More</Link>}
            />
          </ListItem>
        ))}
      </StyledMenu>
    </>
  )
}

export default AppNotificationsMenu;

