import { useState } from 'react';
import { NextPage } from 'next';

import { Box, Button, Grid, Paper, Typography } from '@mui/material'

import ChartContainer from '@views/ChartContainer';
import EnergieOverview from '@views/EnergieOverview';
import { SubscriptionFormDialog } from '@components/forms/SubscriptionForm';
import { DeviceFormDialog } from '@components/forms/DeviceForm';
import UserFormDialog from '@components/forms/UserForm/UserFormDialog';

const Dashboard: NextPage = ({}) => {
  const [open, setOpen] = useState(false);
  const [deviceOpen, setDeviceOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  return (
    <Box sx={{ height: '100%' }}>
      <SubscriptionFormDialog 
        open={open} 
        onClose={() => setOpen(false)} 
        onSubmit={(data) => console.log(data)}
      />
      <DeviceFormDialog
        open={deviceOpen}
        onClose={() => setDeviceOpen(false)}
        onSubmit={(data) => console.log(data)}
      />
      <UserFormDialog
        open={userOpen}
        onClose={() => setUserOpen(false)}
        onSubmit={(data) => console.log(data)}
      />
      <EnergieOverview />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={8}>
          <ChartContainer sx={{ height: 400, mb: 2 }} />
          <ChartContainer sx={{ height: 400 }} />
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper variant='outlined' sx={{ borderRadius: 2, height: 1 }}>
            <Button 
              variant='outlined' 
              color='primary' 
              fullWidth
              onClick={() => setOpen(true)}
            >
              Subscription Create
            </Button>
            <Button
              variant='outlined'
              color='primary'
              fullWidth
              onClick={() => setDeviceOpen(true)}
            >
              Device Create
            </Button>
            <Button
              variant='outlined'
              color='primary'
              fullWidth
              onClick={() => setUserOpen(true)}
            >
              User Create
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard;
