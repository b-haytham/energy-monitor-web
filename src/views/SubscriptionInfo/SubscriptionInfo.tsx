import { useSnackbar } from "notistack";

import { Grid, IconButton, List, ListItem, ListItemText, Paper } from "@mui/material";
import { CopyAllOutlined } from "@mui/icons-material";

import { useClipboard } from "@mantine/hooks";

import { Subscription } from "@api/types/subscription";

interface SubscriptionInfoProps {
  subscription: Subscription  
}

const SubscriptionInfo = ({ subscription }: SubscriptionInfoProps) => {
  const clipboard = useClipboard();
  const { enqueueSnackbar } = useSnackbar()
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, mt: 2, p: 2 }}>
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
    </Paper>
  )
}

export default SubscriptionInfo;
