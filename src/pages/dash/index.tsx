import { useState } from 'react';
import { NextPage } from 'next';

import { Box } from '@mui/material'

import EnergieOverview from '@views/EnergieOverview';
import { useAppSelector } from '@redux/store';
import ChartContainer from '@views/ChartContainer';
import TotalEnergieConsumptionChart from '@components/charts/TotalEnergieConsumptionChart';
import DevicesOverviewSection from '@views/DevicesOverviewSection';
import { Subscription } from '@api/types/subscription';

const Dashboard: NextPage = ({}) => {
  const loggedInUser = useAppSelector(state => state.auth.user);
  console.log(loggedInUser);
  const devices = useAppSelector(state => state.devices.devices);
  return (
    <Box sx={{ height: '100%' }}>
      <EnergieOverview />

      <ChartContainer
        sx={{ height: 500, mt: 2 }}
      >
        {loggedInUser && <TotalEnergieConsumptionChart 
          subscription={(loggedInUser.subscription as Subscription)._id}
          devices={devices}
        />}
      </ChartContainer>
      
      <DevicesOverviewSection 
        devices={devices} 
        ContainerProps={{ sx: { my: 2 } }} 
      />
    </Box>
  )
}

export default Dashboard;
