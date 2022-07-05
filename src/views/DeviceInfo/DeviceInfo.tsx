import { useSnackbar } from "notistack";
import { useClipboard } from "@mantine/hooks";

import { Grid, IconButton, List, ListItem, ListItemText, Paper } from "@mui/material";
import { CopyAllOutlined } from "@mui/icons-material";

import { Device } from "@api/types/device";
import { Subscription } from "@api/types/subscription";

interface DeviceInfoProps {
  device: Device;
  token: string
}

const DeviceInfo = ({ device, token }: DeviceInfoProps) => {
  const clipboard = useClipboard();
  const { enqueueSnackbar } = useSnackbar();
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
                    clipboard.copy(device._id)
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
                secondary={device._id}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText 
                primaryTypographyProps={{ variant: 'subtitle2' }}
                primary="Name" 
                secondary={device.name} 
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText 
                primaryTypographyProps={{ variant: 'subtitle2' }}
                primary="Description" 
                secondary={device.description} 
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
                    clipboard.copy((device.subscription as Subscription).company_info.name)
                    enqueueSnackbar('Subscription copied', { variant: 'success' })
                  }}
                >
                  <CopyAllOutlined fontSize="small" />
                </IconButton>
              }
            >
              <ListItemText
                primaryTypographyProps={{ variant: 'subtitle2' }}
                primary="Subscription" 
                secondary={(device.subscription as Subscription).company_info.name} 
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText 
                primaryTypographyProps={{ variant: 'subtitle2' }}
                primary="Values" 
                secondary={device.values.length} 
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <ListItem 
        disablePadding 
        secondaryAction={
          <IconButton 
            size="small" 
            onClick={() => {
              clipboard.copy(token)
              enqueueSnackbar('Device token copied', { variant: 'success' })
            }}
          >
            <CopyAllOutlined fontSize="small" />
          </IconButton>
        }
      >
        <ListItemText 
          primaryTypographyProps={{ variant: 'subtitle2' }}
          secondaryTypographyProps={{  sx: { width: { xs: 250, sm: 350, md: 600, lg: 1200 } } }}
          primary="Token" 
          secondary={token} 
          sx={{ width: 100, wordWrap: 'break-word' }}
        />
      </ListItem>
    </Paper>
  )
}

export default DeviceInfo;
