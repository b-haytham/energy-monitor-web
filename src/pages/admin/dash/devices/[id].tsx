import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';

import { Box, IconButton, Paper, Stack, Typography } from '@mui/material'

import { ArrowDownwardOutlined, ArrowUpwardOutlined, EditOutlined } from '@mui/icons-material';

import PageHeader from '@components/PageHeader';
import ValueCard from '@components/cards/ValueCard';
import EnergieConsumptionChart from '@components/charts/EnergieConsumptionChart';
import PowerChart from '@components/charts/PowerChart';
import ChartContainer from '@views/ChartContainer';
import HorizontalScroll from '@components/HorizontalScroll';

import { useDeviceDetails } from 'src/hooks/useDeviceDetails';

import { handleServerSidePropsRejection } from '@utils/errors';

import socket from 'src/socket';

import api from '@api';
import { Device } from '@api/types/device';
import { useDisclosure } from '@mantine/hooks';
import { DeviceFormDialog } from '@components/forms/DeviceForm';
import DeviceInfo from '@views/DeviceInfo';

interface DeviceDetailProps {
  device: Device
}

const DeviceDetail: NextPage<DeviceDetailProps> = ({ device: serverDevice }) => {
  const router = useRouter();
  const { device, subscription, values, handlers } = useDeviceDetails(serverDevice); 
  const [token, setToken] = useState<string | null>(null)
  const [showMore, setShowMore] = useState(false); 
  

  const [updateOpen, updateHandlers] = useDisclosure(false);

  const fetchToken = async() => {
    try {
      const data = await api.auth.createDeviceToken(device._id);
      setToken(data.access_token);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchToken()
    socket.on(`notification/${device._id}`, (data) => {
      console.log(`WS_DEVICE [${device._id}]`, data);
      handlers.handleNotification(data);
    })

    return () => {
      socket.off(`notification/${device._id}`)
    }
  }, [])

  return (
    <Box>
      <DeviceFormDialog 
        open={updateOpen}
        onClose={updateHandlers.close}
        initialValues={device}
        onSubmit={(values) => {
          console.log(values);
        }}
      />
      <PageHeader
        title={device.name}
        onBack={() => router.back()}
        right={
          <Stack direction={"row"} spacing={2}>
            <IconButton size={'small'} onClick={updateHandlers.open}>
              <EditOutlined />
            </IconButton>

            <IconButton size={'small'} onClick={() => setShowMore((prev) => !prev)}>
              {showMore ? <ArrowUpwardOutlined /> : <ArrowDownwardOutlined />}
            </IconButton>
          </Stack>
        }
      />
      
      {showMore && token && (<DeviceInfo device={device} token={token} />)}

      <HorizontalScroll 
        spacing={2}
        ContainerProps={{
          sx: { mt: 2 }
        }}
      >
        {values.map(value => (
          <ValueCard 
            key={value._id}
            value={value}
          />
        ))}
      </HorizontalScroll> 
      <ChartContainer 
        sx={{ height: 500, mt: 2 }}
      >
        <PowerChart subscription={subscription._id} device={device._id} />
      </ChartContainer>
      <ChartContainer 
        sx={{ height: 500, my: 2 }}
      >
        <EnergieConsumptionChart subscription={subscription._id} device={device._id} />
      </ChartContainer>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  console.log(req.url);
  let device: Device;
  
  try {
    device = await api.devices.get(
      params!.id as string, 
      { headers: req.headers, params: { p: "subscription" } }
    ); 
    console.log("Server ", device);
  } catch (error) {
    return handleServerSidePropsRejection(error, '/admin/auth/login');  
  }

  return {
    props: {
      device,    
    },
  }
}

export default DeviceDetail;
