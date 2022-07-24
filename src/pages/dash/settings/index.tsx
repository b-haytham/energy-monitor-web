import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import { 
  Accordion, 
  AccordionDetails, 
  AccordionSummary,
  Box, 
  Button, 
  Stack, 
  TextField, 
  Typography 
} from '@mui/material'

import { ExpandMoreOutlined } from '@mui/icons-material';

import PageHeader from '@components/PageHeader';
import PasswordInput from '@components/forms/PasswordInput';

import { updateUserInfo } from '@redux/auth/actions';
import { useAppDispatch, useAppSelector } from '@redux/store';

import api from '@api';
import { Role } from '@api/types/user';
import { Subscription } from '@api/types/subscription';
import { updateSubscriptionInfo } from '@redux/subscriptions/actions';

interface SettingsProps {

}

const Settings: NextPage<SettingsProps> = ({ }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const loggedInUser = useAppSelector(state => state.auth.user)
  const userSubscription = loggedInUser?.subscription as Subscription;

  const [personalInfoExpanded, setPersonalInfoExpanded] = useState(true);
  const [subscripitonUpdateExpanded, setSubscripionUpdateExpanded] = useState(false);
  const [credentialsExpanded, setCredentialsExpanded] = useState(false);

  const {
    register: personalInfoRegister,
    handleSubmit: personalInfoHandleSubmit,
  } = useForm({
    defaultValues: {
      first_name: loggedInUser ? loggedInUser.first_name : "",
      last_name: loggedInUser ? loggedInUser.first_name : ""
    }
  })

  const {
    register: credentialRegister,
    handleSubmit: credentialshandleSubmit,
    reset: credentialReset,
  } = useForm({
    defaultValues: {
      current: "",
      new: "",
      confirm: ""
    }
  })

  // const { 
  //   register: notificationsRegister, 
  //   handleSubmit: notificationsHandleSubmit,
  // } = useForm({ 
  //   defaultValues: { 
  //   } 
  // })
  
  const {
    register: subscriptionUpdateRegister,
    handleSubmit: subscriptionUpdateHandleSubmit,
  } = useForm({
    defaultValues: {
      name: userSubscription?.company_info.name ?? "",
      phone: userSubscription?.company_info.phone ?? "",
      email: userSubscription?.company_info.email ?? "",
      energie_cost: userSubscription?.company_info.energie_cost ?? 0,
      currency: userSubscription?.company_info.currency ?? ""
    }
  })
  
  const onCredentialsFormSubmit = async (data: any) => {
    if (data.new !== data.confirm) {
      enqueueSnackbar("Passwords don't match!", { variant: 'error' })
      return;
    }
    try {
      const u = await api.auth.changePassword(data);
      console.log(u);
      enqueueSnackbar('Password Successfully updated', { variant: 'success' })
      credentialReset({ current: "", new : "", confirm: ""});
    } catch (error) {
      enqueueSnackbar((error as any).message, { variant: 'error' })
    }
  }

  const onPersonalInfoFormSubmit = async (data: any) => {
    console.log(data);
    if (!data.first_name.trim() || !data.last_name.trim()) {
      enqueueSnackbar("First name and Last name are required", { variant: 'error' });
      return;
    }
    if (!loggedInUser) {
      enqueueSnackbar("Not supposed to happen", { variant: 'error' });
      return;
    }
    try {
      const u = await dispatch(updateUserInfo({ _id: loggedInUser._id, ...data })).unwrap();
      console.log(u);
      enqueueSnackbar('Personal Information Successfully Updated', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar((error as any).message, { variant: 'error' })
    }
  }

  const onSubscriptionUpdateFormSubmit = async (data: any) => {
    console.log(data);
  
    if (!loggedInUser) {
      enqueueSnackbar("Not supposed to happen", { variant: 'error' });
      return;
    }

    try {
      const u = await dispatch(updateSubscriptionInfo({ _id: userSubscription?._id ?? "", ...data })).unwrap();
      console.log(u);
      enqueueSnackbar('Subscription Information Successfully Updated', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar((error as any).message, { variant: 'error' })
    }
  }

  return (
    <Box>
      <PageHeader
        title='Settings'
        onBack={() => router.back()}
      />
      <Box sx={{ mt: 2 }}>
        <Accordion 
          variant="outlined" 
          sx={{ borderRadius: 2, mb: 2 }} 
          expanded={personalInfoExpanded}
          onChange={(_, expanded) => setPersonalInfoExpanded(expanded)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">Personal Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={personalInfoHandleSubmit(onPersonalInfoFormSubmit)}>
              <Stack direction={'row'} spacing={2}>
                <TextField id="first_name" fullWidth label="First Name" {...personalInfoRegister('first_name')} />
                <TextField id="last_name" fullWidth label="Last Name" {...personalInfoRegister('last_name')} />
              </Stack>
              <Stack direction="row" justifyContent="end" sx={{ mt: 2 }}>
                <Button type="submit">
                  Submit
                </Button>
              </Stack>
            </form>
          </AccordionDetails>
        </Accordion>

        {loggedInUser && loggedInUser.role == Role.SUPER_USER && <Accordion 
          variant="outlined" 
          sx={{ borderRadius: 2, mb: 2 }} 
          expanded={subscripitonUpdateExpanded}
          onChange={(_, expanded) => setSubscripionUpdateExpanded(expanded)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">Subscription Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={subscriptionUpdateHandleSubmit(onSubscriptionUpdateFormSubmit)}>
              <Stack direction={'row'} spacing={2}>
                <TextField id="company_name" fullWidth label="Company Name" {...subscriptionUpdateRegister('name')} />
                <TextField id="company_phone" fullWidth label="Company Phone" {...subscriptionUpdateRegister('phone')} />
              </Stack>
              <TextField 
                id="company_email" 
                fullWidth label="Company Email" 
                sx={{ mt: 2 }}
                {...subscriptionUpdateRegister('email')} 
              />
              <Stack direction={'row'} spacing={2} sx={{ mt: 2 }}>
                <TextField 
                  id="energie_cost" 
                  fullWidth  
                  label="Energie Cost" 
                  placeholder="(kw/h) unit cost"
                  {...subscriptionUpdateRegister('energie_cost')} 
                />
                <TextField 
                  id="currency" 
                  fullWidth label="Currency" 
                  placeholder="e.g (DT)"
                  {...subscriptionUpdateRegister('currency')} 
                />
              </Stack>
              <Stack direction="row" justifyContent="end" sx={{ mt: 2 }}>
                <Button type="submit">
                  Submit
                </Button>
              </Stack>
            </form>
          </AccordionDetails>
        </Accordion>}

        <Accordion 
          variant="outlined" 
          sx={{ borderRadius: 2, mb: 2 }} 
          expanded={credentialsExpanded}
          onChange={(_, expanded) => setCredentialsExpanded(expanded)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">Credential Settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={credentialshandleSubmit(onCredentialsFormSubmit)}>
              <PasswordInput 
                variant='outlined' 
                id="current" 
                fullWidth  
                label="Current Password" 
                {...credentialRegister('current')} 
              />
              <Stack direction={'row'} spacing={2} sx={{ mt: 2 }}>
                <PasswordInput 
                  variant='outlined' 
                  id="new" 
                  fullWidth  
                  label="New Password" 
                  {...credentialRegister('new')} 
                />
                <PasswordInput 
                  variant='outlined' 
                  id="confirm" 
                  fullWidth  
                  label="Confirm Password" 
                  {...credentialRegister('confirm')} 
                />
              </Stack>
              <Stack direction="row" justifyContent="end" sx={{ mt: 2 }}>
                <Button type="submit">
                  Submit
                </Button>
              </Stack>
            </form>
          </AccordionDetails>
        </Accordion>
        <Accordion variant={"outlined"} sx={{ borderRadius: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography variant="h6">Notification Settings</Typography>
          </AccordionSummary>
        </Accordion>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  console.log(req.url);
  return {
    props: {

    }
  }
}

export default Settings;
