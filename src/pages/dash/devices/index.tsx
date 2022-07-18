import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box, Paper } from '@mui/material'

import PageHeader from '@components/PageHeader';
import DevicesTable from '@components/tables/DevicesTable';

import { handleServerSidePropsRejection } from '@utils/errors';

import api from '@api';
import { Device } from '@api/types/device';

interface DeviceProps {
  devices: Device[]
}

const Devices: NextPage<DeviceProps> = ({ devices }) => {
  const router = useRouter();
  return (
    <Box sx={{  height: 1, display: 'flex', flexDirection: 'column' }}>
      <PageHeader
        title='Devices'
        onBack={() => router.back()}
      />

      <Paper
        variant='outlined'
        sx={{
          my: 2,
          border: 'none',
          flex: 1,
        }}
      >
        <DevicesTable
          devices={devices} 
          onView={(id) => {
            router.push("/dash/devices/[id]", `/dash/devices/${id}`)
          }}
          // onEdit={(id) => {}}
          // onDelete={(id) => {}}
        />
      </Paper>
    </Box>
  );
}
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  console.log(req.url);
  let devices: Device[];
  try {
    devices = await api.devices.find({ headers: req.headers, params: { p: "subscription" } }) 
    console.log("Server ", devices);
  } catch (error) {
    return handleServerSidePropsRejection(error, '/auth/login');
  }
  return {
    props: {
      devices,
    }
  }
} 

export default Devices;
