import { useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material'

import ChartContainer from '@views/ChartContainer';
import EnergieOverview from '@views/EnergieOverview';
import { SubscriptionFormDialog } from '@components/forms/SubscriptionForm';

const Dashboard = (props: {}) => {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ height: '100%' }}>
      <SubscriptionFormDialog 
        open={open} 
        onClose={() => setOpen(false)} 
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
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard;
