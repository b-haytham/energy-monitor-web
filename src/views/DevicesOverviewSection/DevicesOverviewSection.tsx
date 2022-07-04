import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Fuse from 'fuse.js'
import dayjs from "dayjs";

import { 
  Box, 
  Divider, 
  Grid, 
  GridProps, 
  IconButton, 
  InputAdornment, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Paper, 
  Stack, 
  TextField, 
  Typography 
} from "@mui/material"

import { OpenInNewOutlined, SearchOutlined } from "@mui/icons-material";

import { Device } from "@api/types/device";
import { Value } from "@api/types/value";
import { useAppSelector } from "@redux/store";

interface DevicesOverviewSectionProps {
  devices: Device[]
  ContainerProps?: GridProps;
}

const DevicesOverviewSection = ({ devices: initialDevices, ContainerProps }: DevicesOverviewSectionProps) => {
  const router = useRouter();
  const [devices, setDevices] = useState(initialDevices);
  // const devices = useAppSelector(state => state.devices.devices);
  
  const fuse = useRef<Fuse<Device>>(new Fuse(devices, { keys: ['name', 'description'] }))

  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  
  const [searchTerm, setSearchTerm] = useState("");

  const selectedDeviceValues = useAppSelector(state => {
    if(selectedDevice && selectedDevice._id in state.devices.deviceValuesMap) {
      console.log('IIIIIIIII')
      return state.devices.deviceValuesMap[selectedDevice._id];
    } else if (selectedDevice) {
      const dev = devices.find(dev => dev._id == selectedDevice._id)
      return dev ? dev.values : null;
    } else {
      return null
    }
  }) 

  // useEffect(() => {
  //   fuse.current = new Fuse(devices, { keys: ['name', 'description'] })
  // }, [devices])

  return (
    <Grid container columnSpacing={2} {...ContainerProps}>
      <Grid item xs={12} md={6}>
        <Paper  sx={{ borderRadius: 2, display: 'flex', flexDirection: 'column', height: 500 }} >
          <Box p={2}>
            <TextField 
              id="search" 
              fullWidth 
              label="Search" 
              size="medium"
              placeholder="Search Device"
              value={searchTerm}
              onChange={(e) => {
                if (e.target.value) {
                  setSearchTerm(e.target.value)
                  const res = fuse.current.search(e.target.value);
                  setDevices((_) => res.map(it => it.item));
                } else {
                  setSearchTerm(e.target.value)
                  setDevices((_) => initialDevices);
                }
              }}
              InputProps={{
                sx: { borderRadius: 2 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => {}}>
                      <SearchOutlined fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>
          <Divider />
          <List sx={{ overflow: 'auto', flex: 1 }}>
            {devices.map(device => (
              <ListItemButton 
                selected={selectedDevice && selectedDevice._id == device._id ? true : false}
                key={device._id} 
                dense 
                onClick={() => {
                  if (selectedDevice && selectedDevice._id == device._id) {
                    setSelectedDevice(null);
                  } else {
                    setSelectedDevice(device || null)
                  }
                }}
              >
                <ListItemText 
                  primary={device.name}
                  secondary={device.description}
                
                />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper variant={'outlined'} sx={{ borderRadius: 2, display: 'flex', flexDirection: 'column', height: 500 }}>
          {selectedDevice && (
            <>
              <Stack direction="row" justifyContent="space-between" alignItems={'center'} p={2}>
                <Box>
                  <Typography variant="h6">{selectedDevice.name}</Typography>
                  <Typography variant="caption">{selectedDevice.description}</Typography>
                </Box>
                <IconButton 
                  size="large" 
                  color="primary" 
                  onClick={() => {
                    router.push('/admin/dash/devices/[id]', `/admin/dash/devices/${selectedDevice._id}`)
                  }}
                  >
                  <OpenInNewOutlined fontSize="medium" />
                </IconButton>
              </Stack>
              <Divider />
              <List sx={{ overflow: 'auto', flex: 1  }}>
                {selectedDeviceValues && (selectedDeviceValues as Value[]).map(value => (
                  <ListItem 
                    key={value.accessor} 
                    dense 
                    secondaryAction={
                      <>
                        <Typography align="right">
                          {value.latest_value.value ? 
                            `${value.latest_value.value.toFixed(2)} (${value.unit})` :  
                            "NaN"}
                        </Typography>
                        <Typography>
                          {value.latest_value.timestamp ? 
                            dayjs(new Date(value.latest_value.timestamp)).format('YYYY/MM/DD hh:mm:ss') : 
                            "--/--/--  --:--"}
                        </Typography>
                      </>
                    }
                  >
                    <ListItemText 
                      primary={value.name}
                      secondary={value.description}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}  
        </Paper>
      </Grid>
    </Grid>
  )
}

export default DevicesOverviewSection;
