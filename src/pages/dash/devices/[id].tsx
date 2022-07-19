import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box, IconButton, Paper } from '@mui/material'
import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@mui/icons-material';

import PageHeader from '@components/PageHeader';
import HorizontalScroll from '@components/HorizontalScroll';
import ChartContainer from '@views/ChartContainer';
import DeviceInfo from '@views/DeviceInfo';
import ValueCard from '@components/cards/ValueCard';
import PowerChart from '@components/charts/PowerChart';
import EnergieConsumptionChart from '@components/charts/EnergieConsumptionChart';

import { handleServerSidePropsRejection } from '@utils/errors';
import { useDeviceDetails } from 'src/hooks/useDeviceDetails';

import api from '@api';
import socket from 'src/socket';

import { Device } from '@api/types/device';

interface DeviceDetailProps {
  device: Device
}

const DeviceDetail: NextPage<DeviceDetailProps> = ({ device: serverDevice }) => {
  const router = useRouter();
  const { device, subscription, values, handlers } = useDeviceDetails(serverDevice); 
  const [token, setToken] = useState<string | null>(null)
  const [showMore, setShowMore] = useState(false); 

  
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
      <PageHeader
        title={device.name}
        onBack={() => router.back()}
        right={
          <IconButton size={'small'} onClick={() => setShowMore((prev) => !prev)}>
            {showMore ? <ArrowUpwardOutlined /> : <ArrowDownwardOutlined />}
          </IconButton>
        }
      />

      {showMore && (<DeviceInfo device={device} token={token || undefined} />)}

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
        sx={{ height: 500, mt: 2 }}
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
    return handleServerSidePropsRejection(error, '/auth/login');  
  }

  return {
    props: {
      device,    
    },
  }
}

export default DeviceDetail;
