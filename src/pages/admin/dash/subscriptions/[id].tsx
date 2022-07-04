import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { Box, Fade, Grid, IconButton, Paper, Slide, Stack, Typography } from '@mui/material'

import { ArrowDownwardOutlined, ArrowUpwardOutlined, EditOutlined } from '@mui/icons-material';

import PageHeader from '@components/PageHeader';
import ChartContainer from '@views/ChartContainer';
import TotalEnergieConsumptionChart from '@components/charts/TotalEnergieConsumptionChart';
import EnergieOverview from '@views/EnergieOverview';

import { handleServerSidePropsRejection } from '@utils/errors';
import { useSubscriptionDetails } from 'src/hooks/useSubscriptionDetails';

import api from '@api';
import { Subscription } from '@api/types/subscription';
import { Device } from '@api/types/device';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { SubscriptionFormDialog } from '@components/forms/SubscriptionForm';
import DevicesOverviewSection from '@views/DevicesOverviewSection';
import { useAppSelector } from '@redux/store';

interface SubscriptionDetailProps {
  subscription: Subscription
}    


const SubscriptionDetail = ({ subscription: serverSubscription }: SubscriptionDetailProps) => {
  const router = useRouter();
  const { subscription, devices } = useSubscriptionDetails(serverSubscription);

  // devices in redux store
  const storedDevices = useAppSelector((state) => state.devices.devices
    .filter(dev => (dev.subscription as Subscription)._id == subscription._id))

  const [showMore, setShowMore] = useState(false); 
  
  const [updateOpen, updateHandlers] = useDisclosure(false)

  return (
    <Box>
      <SubscriptionFormDialog 
        open={updateOpen}
        onClose={updateHandlers.close}
        initialValues={subscription}
        onSubmit={(data) => {
          console.log("Update >>",data);
        }}
      />
      <PageHeader 
        title={subscription.company_info.name} 
        onBack={() => router.back()} 
        right={
          <Stack direction={"row"} spacing={2}>
            <IconButton size={'small'} onClick={() => updateHandlers.open()}>
              <EditOutlined />
            </IconButton>

            <IconButton size={'small'} onClick={() => setShowMore((prev) => !prev)}>
              {showMore ? <ArrowUpwardOutlined /> : <ArrowDownwardOutlined /> }
            </IconButton>
          </Stack>
        }
      />
      {showMore && (
        <Paper variant="outlined" sx={{ borderRadius: 2, mt: 2, p: 2 }}>
          <Typography>ID {subscription._id}</Typography> 
          <Typography>Name {subscription.company_info.name}</Typography> 
          <Typography>Email {subscription.company_info.email}</Typography> 
          <Typography>Phone {subscription.company_info.phone}</Typography> 
          <Typography>Users {subscription.users.length}</Typography>
          <Typography>Devices {subscription.devices.length}</Typography>
        </Paper>
      )}
      <EnergieOverview sx={{ mt: 0 }} />

      <ChartContainer
        sx={{ height: 500, mt: 2 }}
      >
        <TotalEnergieConsumptionChart 
          subscription={subscription._id}
          devices={subscription.devices as Device[]}
        />
      </ChartContainer>
      
      <DevicesOverviewSection 
        devices={storedDevices} 
        ContainerProps={{ sx: { my: 2 } }} 
      />
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  console.log(req.url); 

  let subscription: Subscription;
  
  try {
    subscription = await api.subscriptions.get(
      params!.id as string, 
      { headers: req.headers, params: { p: "admin,users,devices" } }
    ); 
    console.log("Server ", subscription);
  } catch (error) {
    return handleServerSidePropsRejection(error);  
  }

  return {
    props: {
      subscription,    
    },
  }

}

export default SubscriptionDetail;
