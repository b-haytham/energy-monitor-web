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

import { useAppDispatch, useAppSelector } from '@redux/store';

import api from '@api';
import { updateUserInfo } from '@redux/auth/actions';

interface SettingsProps {}

const Settings: NextPage<SettingsProps> = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const loggedInUser = useAppSelector(state => state.auth.user) 

  const { 
    register: personalInfoRegister,
    handleSubmit: personalInfoHandleSubmit,
  } = useForm({ 
    defaultValues: { 
      first_name: loggedInUser ? loggedInUser.first_name : "", 
      last_name: loggedInUser ? loggedInUser.last_name : "" 
    } 
  })

  const { 
    register: credentialRegister, 
    handleSubmit: credentialshandleSubmit,
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

  const onCredentialsFormSubmit = async (data: any) => {
    if (data.new !== data.confirm) {
      enqueueSnackbar("Passwords don't match!", { variant: 'error' })
      return; 
    }
    try {
      const u = await api.auth.changePassword(data);
      console.log(u);
      enqueueSnackbar('Password Successfully updated', { variant: 'success' })
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
        <Accordion variant="outlined" sx={{ borderRadius: 2, mb: 2 }} expanded>
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
        <Accordion variant="outlined" sx={{ borderRadius: 2, mb: 2 }} expanded>
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">Credential Settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={credentialshandleSubmit(onCredentialsFormSubmit)}>
              <TextField id="current" fullWidth type="password" label="Current Password" {...credentialRegister('current')} />
              <Stack direction={'row'} spacing={2} sx={{ mt: 2 }}>
                <TextField id="new" fullWidth type="password" label="New Password" {...credentialRegister('new')} />
                <TextField id="confirm" fullWidth type="password" label="Confirm Password" {...credentialRegister('confirm')} />
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
