import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';

import { Box, Button, Grid, Paper, Typography } from '@mui/material'

import PageHeader from '@components/PageHeader';

import { handleServerSidePropsRejection } from '@utils/errors';

import api from '@api';
import { Device } from '@api/types/device';
import ChartContainer from '@views/ChartContainer';
import HorizontalScroll from '@components/HorizontalScroll';

interface DeviceDetailProps {
  device: Device
}

const DeviceDetail: NextPage<DeviceDetailProps> = ({ device }) => {
  const router = useRouter();
  return (
    <Box>
      <PageHeader
        title={device.name}
        onBack={() => router.back()}
        right={
          <Button
            variant='outlined'
            color='primary'
            onClick={() => {}}
          >
            Edit Device 
          </Button>
        }
      />
      <HorizontalScroll 
        spacing={2}
        ContainerProps={{
          sx: { mt: 2 }
        }}
      >
        <Paper
          variant='outlined'
          sx={{ 
            p: 2, 
            width: 700, 
            height: 150,
            borderRadius: 2,
            mb: 1,
          }}
        >

        </Paper>
        <Paper
          variant='outlined'
          sx={{ 
            p: 2, 
            width: 700, 
            height: 150,
            borderRadius: 2,
            mb: 1,
          }}
        >

        </Paper>
      </HorizontalScroll> 
      <ChartContainer 
        sx={{ height: 500, mt: 2 }}
      />
      <ChartContainer 
        sx={{ height: 500, mt: 2 }}
      />
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
    return handleServerSidePropsRejection(error);  
  }

  return {
    props: {
      device,    
    },
  }
}

export default DeviceDetail;
