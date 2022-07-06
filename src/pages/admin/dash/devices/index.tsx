import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box, IconButton, Paper } from '@mui/material'
import { AddOutlined } from '@mui/icons-material';

import PageHeader from '@components/PageHeader';
import DevicesTable from '@components/tables/DevicesTable';
import ConfirmDelete from '@components/forms/ConfirmDelete';
import { DeviceFormDialog } from '@components/forms/DeviceForm';

import { useDisclosure } from '@mantine/hooks';
import { useDevices } from 'src/hooks/useDevices';

import api from '@api';
import { Device } from '@api/types/device';
import { handleServerSidePropsRejection } from '@utils/errors';

interface DeviceProps {
  devices: Device[];
}

const Devices: NextPage<DeviceProps> = ({ devices: serverDevices }) => {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { devices, handlers } = useDevices(serverDevices);
  const [createDeviceOpen, createDeviceHandlers] = useDisclosure(false);

  // device to update
  const [deviceToUpdate, setDeviceToUpdate] = useState<Device | null>(null)

  // device to delete
  const [deviceToDelete, setDeviceToDelete] = useState<Device | null>(null)

  return (
    <Box sx={{  height: 1, display: 'flex', flexDirection: 'column' }}>
      {deviceToDelete && <ConfirmDelete 
        title={"Delete Device"}
        content={
          `You're about to delete this device, this action is irreversible.\n 
          All data associated with this device will be deleted`
        }
        open={Boolean(deviceToDelete)}
        onClose={() => {
          setDeviceToDelete(null);
        }}
        onSubmit={async () => {
          try {
            const data = await handlers.remove(deviceToDelete._id);
            console.log('DELETED >>', data);
            setDeviceToDelete(null)
            enqueueSnackbar("Device successfully deleted.", { variant: 'success' })
          } catch (error) {
            console.error(error);
            enqueueSnackbar("Failed to delete device.", { variant: 'error' })
          }
        }}
      />}
      <DeviceFormDialog
        open={createDeviceOpen}
        onClose={createDeviceHandlers.close}
        onSubmit={async (data) => {
          try {
            const device = await handlers.create(data);
            console.log(device);
            createDeviceHandlers.close();
            enqueueSnackbar("Device successfully created.", { variant: 'success' })
          } catch (error) {
            console.error(error);
            enqueueSnackbar("Failed to create device.", { variant: 'error' })
          }
        }}
      />

      {deviceToUpdate && <DeviceFormDialog
        open={true}
        onClose={() => setDeviceToUpdate(null)}
        initialValues={deviceToUpdate}
        onSubmit={async (data) => {
          console.log(data);
          try {
            const device = await handlers.update({ _id: deviceToUpdate._id, ...data });
            console.log(device);
            setDeviceToUpdate(null);
            enqueueSnackbar("Device successfully updated.", { variant: 'success' })
          } catch (error) {
            console.error(error);
            enqueueSnackbar("Failed to update device.", { variant: 'error' })
          }
        }}
      />}

      <PageHeader
        title='Devices'
        onBack={() => router.back()}
        right={
          <IconButton size="small" onClick={createDeviceHandlers.open}>
            <AddOutlined />
          </IconButton>
        }
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
            router.push("/admin/dash/devices/[id]", `/admin/dash/devices/${id}`)
          }}
          onEdit={(id) => {
            const device = devices.find(dev => dev._id == id);
            setDeviceToUpdate(device || null);
          }}
          onDelete={(id) => { 
            const device = devices.find(dev => dev._id == id);
            setDeviceToDelete(device || null);
          }}
        />
      </Paper>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  console.log(req.url);
  let devices: Device[];

  try {
    devices = await api.devices.find({ headers: req.headers, params: { p: "subscription" } });
    console.log("Server ", devices);

  } catch (error) {
    return handleServerSidePropsRejection(error, '/admin/auth/login');
  }

  return {
    props: {
      devices
    }
  }
}

export default Devices;
