import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { 
  Box, 
  IconButton, 
  MenuItem, 
  Stack,
} from '@mui/material'

import { 
  AddOutlined, 
  ArrowDownwardOutlined, 
  ArrowUpwardOutlined, 
  EditOutlined, 
  PersonOutlined, 
  PrecisionManufacturingOutlined
} from '@mui/icons-material';

import PageHeader from '@components/PageHeader';
import ChartContainer from '@views/ChartContainer';
import TotalEnergieConsumptionChart from '@components/charts/TotalEnergieConsumptionChart';
import EnergieOverview from '@views/EnergieOverview';
import DevicesOverviewSection from '@views/DevicesOverviewSection';
import SubscriptionInfo from '@views/SubscriptionInfo';
import CustomMuiMenu from '@components/CustomMuiMenu';
import { SubscriptionFormDialog } from '@components/forms/SubscriptionForm';
import { DeviceFormDialog } from '@components/forms/DeviceForm';
import { UserFormDialog } from '@components/forms/UserForm';

import { useDisclosure } from '@mantine/hooks';
import { handleServerSidePropsRejection } from '@utils/errors';
import { useSubscriptionDetails } from 'src/hooks/useSubscriptionDetails';
import { useAppSelector } from '@redux/store';
import { useSnackbar } from 'notistack';

import api from '@api';
import { Subscription } from '@api/types/subscription';
import { Device } from '@api/types/device';

interface SubscriptionDetailProps {
  subscription: Subscription
}

const AddPopover = ({
  onAddDevice, 
  onAddUser
}: {
  onAddUser: () => void;
  onAddDevice: () => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <IconButton size={'small'} onClick={(e) => open ? handleClose() : handleOpen(e)}>
        <AddOutlined />
      </IconButton>
      <CustomMuiMenu
        id="customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        
        <MenuItem 
          onClick={() => {
            onAddDevice();
            handleClose();
          }} 
          disableRipple
        >
          <PrecisionManufacturingOutlined />
          Device
        </MenuItem>
        <MenuItem 
          onClick={() => {
            onAddUser();
            handleClose();
          }} 
          disableRipple
        >
          <PersonOutlined />
          User
        </MenuItem>
      </CustomMuiMenu>
    </>
  )
}

const SubscriptionDetail = ({ subscription: serverSubscription }: SubscriptionDetailProps) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { 
    subscription, 
    handlers 
  } = useSubscriptionDetails(serverSubscription);

  // devices in redux store
  const storedDevices = useAppSelector((state) => state.devices.devices
    .filter(dev => (dev.subscription as Subscription)._id == subscription._id))

  const [showMore, setShowMore] = useState(false); 
  
  const [updateSubscriptionOpen, updateSubscriptionHandlers] = useDisclosure(false)

  const [createDeviceOpen, createDeviceHandlers] = useDisclosure(false)
  const [createUserOpen, createUserHandlers] = useDisclosure(false)
  
  return (
    <Box>
      <DeviceFormDialog 
        open={createDeviceOpen}
        onClose={createDeviceHandlers.close}
        //@ts-ignore
        initialValues={{
          subscription,
        }}
        onSubmit={async (data) => {
          console.log(data);
          try {
            const device = await handlers.createDevice(data);
            createDeviceHandlers.close(); 
            enqueueSnackbar("Device successfully created", { variant: 'success' })
            console.log('device >>', device);
          } catch (error: any) {
            console.error(error);
            enqueueSnackbar(`Error create device: ${error.message}`, { variant: 'error' })
          }
        }}
      />        

      <UserFormDialog 
        open={createUserOpen}
        onClose={createUserHandlers.close}
        onSubmit={async (data) => {
          try {
            const user = await handlers.createUser(data);
            createUserHandlers.close();
            console.log('User >>> ', user);
            enqueueSnackbar("User successfully created.", { variant: 'success' })
          } catch (error: any) {
            console.error(error);
            enqueueSnackbar(`Failed to create user: ${error.message}`, { variant: 'error' })
          }
        }}
      />

      <SubscriptionFormDialog 
        open={updateSubscriptionOpen}
        onClose={updateSubscriptionHandlers.close}
        initialValues={subscription}
        onSubmit={async (data) => {
          console.log(data)
          try {
            const updatedSubscription = await handlers.updateSubscription({_id: subscription._id, ...data});
            console.log('Subscription >>> ', updatedSubscription);
            updateSubscriptionHandlers.close();
            enqueueSnackbar("Subscription successfully created.", { variant: 'success' })
          } catch (error: any) {
            console.error(error);
            enqueueSnackbar(`Failed to update subscription: ${error.message}`, { variant: 'error' })
          }
        }}
      />
      <PageHeader 
        title={subscription.company_info.name} 
        onBack={() => router.back()} 
        right={
          <Stack direction={"row"} spacing={2}>
            <IconButton size={'small'} onClick={updateSubscriptionHandlers.open}>
              <EditOutlined />
            </IconButton>

            <IconButton size={'small'} onClick={() => setShowMore((prev) => !prev)}>
              {showMore ? <ArrowUpwardOutlined /> : <ArrowDownwardOutlined /> }
            </IconButton>
            <AddPopover 
              onAddUser={() => { 
                createUserHandlers.open();
              }}
              onAddDevice={() => { 
                createDeviceHandlers.open();
              }}
            />
          </Stack>
        }
      />
      {showMore && (<SubscriptionInfo subscription={subscription} />)}

      <EnergieOverview subscription={subscription._id} sx={{ mt: 0 }} />

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
    return handleServerSidePropsRejection(error, '/admin/auth/login');  
  }

  return {
    props: {
      subscription,    
    },
  }
}

export default SubscriptionDetail;
