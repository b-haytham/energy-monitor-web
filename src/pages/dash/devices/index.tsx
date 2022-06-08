import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box, Paper } from '@mui/material'

import PageHeader from '@components/PageHeader';
import DevicesTable from '@components/tables/DevicesTable';

import { Device } from '@api/types/device';
import { handleServerSidePropsRejection } from '@utils/errors';
import api from '@api';

interface DeviceProps {
  devices: Device[]
}

const Devices: NextPage<DeviceProps> = ({ devices }) => {
  const router = useRouter();
  return (
    <Box>
      <PageHeader
        title='Devices'
        onBack={() => router.back()}
      />

      <Paper
        variant='outlined'
        sx={{
          mt: 2,
          border: 'none',
          height: 500
        }}
      >
        <DevicesTable
          devices={devices} 
          onView={(id) => {
            router.push("/dash/devices/[id]", `/dash/devices/${id}`)
          }}
          onEdit={(id) => {}}
          onDelete={(id) => {}}
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
    return handleServerSidePropsRejection(error);
  }
  return {
    props: {
      devices,
    }
  }
} 

export default Devices;
