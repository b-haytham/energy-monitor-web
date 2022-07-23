import Link from "next/link";

import { Avatar, Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import { 
  DeleteOutlined, 
  MarkChatReadOutlined,
  CampaignOutlined,
  InsightsOutlined,
  PrecisionManufacturingOutlined,
} from "@mui/icons-material";

import { AppNotification, AppNotificationType } from "@redux/global/globalSlice";
import { Role } from "@api/types/user";
import { useAppSelector } from "@redux/store";

interface AppNotificationListItemProps {
  notification: AppNotification
  onMarkReadClick: () => void
  onDeleteClick: () => void
}

const getChipColor = (notificationType: AppNotificationType): any =>  {
  if (notificationType == AppNotificationType.DeviceAuthenticated) {
    return 'success'
  }

  if (
    notificationType == AppNotificationType.ReportGenerated 
    || notificationType == AppNotificationType.TriggeredAlert
  ) {
    return 'info'; 
  }

  if (
    notificationType == AppNotificationType.DeviceConnectionLost 
    || notificationType == AppNotificationType.DeviceConnectAttempt
    ) {
    return 'warning'; 
  }

  if (notificationType == AppNotificationType.DeviceDisconnected
    || notificationType == AppNotificationType.DeviceAuthenticationFailed
    ) {
    return 'error'; 
  }

  return 'default';
}


const makeHref = (path: string, role?: Role) => {
  if(!role) return '/';

  if(role.includes('admin')) {
    return '/admin/dash' + path;
  } else {
    return '/dash' + path;
  }
}

const AppNotificationListItem = ({ 
  notification, 
  onMarkReadClick, 
  onDeleteClick 
}: AppNotificationListItemProps) => {
  const userRole = useAppSelector(state => state.auth.user?.role);

  const title = notification.data.type.includes('Device') 
    ? "Device notification"
    : notification.data.type.includes('Alert')
    ? "Alert notification" 
    : notification.data.type.includes('Report')
    ? "Report notification"
    : "Unknown"
  
  const avatarIcon = notification.data.type.includes('Device') 
    ? <PrecisionManufacturingOutlined />
    : notification.data.type.includes('Alert')
    ? <CampaignOutlined />
    : notification.data.type.includes('Report')
    ? <InsightsOutlined />
    : <></>

  const href = notification.data.type.includes('Device')
    ? makeHref(`/devices/${notification.data.device}`, userRole)
    : notification.data.type.includes('Alert')
    ? makeHref(`/alerts/${notification.data.alert._id}`, userRole) 
    : notification.data.type.includes('Report')
    ? makeHref('/reports', userRole)
    : makeHref('/');

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: (theme) => notification.read ? theme.palette.grey[100] : theme.palette.common.white
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="start"
      >
        <Stack direction="row" spacing={2}>
          <Avatar>
            {avatarIcon}
          </Avatar>
          <Link href={href} passHref>
            <Typography 
              component="a" 
              variant="subtitle1"
              sx={{ 
                color: (theme) => theme.palette.text.primary,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              {title}
            </Typography>
          </Link>
        </Stack>
        <Chip 
          label={notification.data.type} 
          size="small" 
          variant="outlined" 
          color={getChipColor(notification.data.type)} 
        />
      </Stack>
      <Stack direction="row" spacing={1} justifyContent='end' sx={{ mt: 0 }}>
        {!notification.read && <IconButton 
          size="small" 
          color="info"
          onClick={onMarkReadClick}
        >
          <MarkChatReadOutlined fontSize="small" />
        </IconButton>}
        <IconButton 
          size="small"
          color="error"
          onClick={onDeleteClick}
        >
          <DeleteOutlined fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default AppNotificationListItem;
