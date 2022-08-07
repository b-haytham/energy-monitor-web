import Link from "next/link";
import { useSnackbar } from "notistack";

import { 
  Box, 
  Chip, 
  Grid, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText, 
  Paper, 
  Typography 
} from "@mui/material";
import { CopyAllOutlined } from "@mui/icons-material";

import HorizontalScroll from "@components/HorizontalScroll";

import { useClipboard } from "@mantine/hooks";
import { useAppSelector } from "@redux/store";

import { Subscription } from "@api/types/subscription";
import { Device } from "@api/types/device";
import { User } from "@api/types/user";

interface SubscriptionInfoProps {
  subscription: Subscription  
}

const SubscriptionInfo = ({ subscription }: SubscriptionInfoProps) => {
  const clipboard = useClipboard();
  const { enqueueSnackbar } = useSnackbar()
  const loggedInUser = useAppSelector(state => state.auth.user)

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, mt: 2, p: 2 }}>
      <Typography variant="body2" fontSize={18} fontWeight={'bold'}>Overview</Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          <List dense disablePadding>
            <ListItem
              disablePadding
              secondaryAction={
                <IconButton
                  size="small" 
                  onClick={() => {
                    clipboard.copy(subscription._id)
                    enqueueSnackbar('ID copied', { variant: 'success' })
                  }}
                >
                  <CopyAllOutlined fontSize="small" />
                </IconButton>
              }
            >
              <ListItemText
                primaryTypographyProps={{ variant: 'subtitle2' }}
                primary="ID" 
                secondary={subscription._id}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText 
                primaryTypographyProps={{ variant: 'subtitle2' }}
                primary="Name" 
                secondary={subscription.company_info.name} 
              />
            </ListItem>
            <ListItem 
              disablePadding
              secondaryAction={
                <IconButton 
                  size="small" 
                  onClick={() => {
                    clipboard.copy(subscription.company_info.email)
                    enqueueSnackbar('Email copied', { variant: 'success' })
                  }}
                >
                  <CopyAllOutlined fontSize="small" />
                </IconButton>
              }
            >
              <ListItemText 
                primaryTypographyProps={{ variant: 'subtitle2' }}
                primary="Email" 
                secondary={subscription.company_info.email} 
              />
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} md={6}>
          <List dense disablePadding>
            <ListItem 
              disablePadding
              secondaryAction={
                <IconButton 
                  size="small" 
                  onClick={() => {
                    clipboard.copy(subscription.company_info.phone)
                    enqueueSnackbar('Phone copied', { variant: 'success' })
                  }}
                >
                  <CopyAllOutlined fontSize="small" />
                </IconButton>
              }
            >
              <ListItemText
                primaryTypographyProps={{ variant: 'subtitle2' }}
                primary="Phone" 
                secondary={subscription.company_info.phone} 
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText 
                primaryTypographyProps={{ variant: 'subtitle2' }}
                primary="Users" 
                secondary={subscription.users.length} 
              />
            </ListItem>
            <ListItem disablePadding >
              <ListItemText 
                primaryTypographyProps={{ variant: 'subtitle2' }}
                primary="Devices" 
                secondary={subscription.devices.length} 
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" fontSize={18} fontWeight={'bold'} sx={{ mb: 2 }}>Devices</Typography>
        {subscription.devices.length == 0 && (<Typography>Not Devices</Typography>)}
        <HorizontalScroll spacing={2}>
          {(subscription.devices as Device[]).map(device => (
            <Link 
              key={device._id} 
              href={
                loggedInUser?.role.includes('admin') 
                ? `/admin/dash/devices/${device._id}` 
                : `/dash/devices/${device._id}`
              }
              passHref
            >
              <Chip 
                component="a"
                label={device.name} 
                sx={{ cursor: 'pointer' }}
              />
            </Link>
          ))}
        </HorizontalScroll>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" fontSize={18} fontWeight={'bold'} sx={{ mb: 2 }}>User</Typography>
        {subscription.users.length == 0 && (<Typography>Not Users</Typography>)}
        <HorizontalScroll spacing={2}>
          {(subscription.users as User[]).map(user => (
            <Link 
              key={user._id} 
              href={
                loggedInUser?.role.includes('admin') 
                ? `/admin/dash/users` 
                : `/dash/users`
              }
              passHref
            >
              <Chip 
                component="a"
                label={`${user.first_name} ${user.last_name}`} 
                sx={{ cursor: 'pointer' }}
              />
            </Link>
          ))}
        </HorizontalScroll>
      </Box>
    </Paper>
  )
}

export default SubscriptionInfo;
