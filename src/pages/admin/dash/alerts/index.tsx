import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box, IconButton, Paper } from '@mui/material'
import { AddOutlined } from '@mui/icons-material';

import PageHeader from '@components/PageHeader';
import AlertsTable from '@components/tables/AlertsTable';
import { AlertFormDialog } from '@components/forms/AlertForm';

import { useDisclosure } from '@mantine/hooks';
import { useAlerts } from 'src/hooks/useAlerts';

import api from '@api';
import { Alert } from '@api/types/alert';
import { handleServerSidePropsRejection } from '@utils/errors';
import { useState } from 'react';
import ConfirmDelete from '@components/forms/ConfirmDelete';
import { useSnackbar } from 'notistack';

interface AlertsProps {
  alerts: Alert[]
}

const Alerts: NextPage<AlertsProps> = ({ alerts: serverAlerts }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { alerts, handlers } = useAlerts(serverAlerts)

  const [createAlertOpen, createAlertHandlers] = useDisclosure(false);

  const [alertToUpdate, setAlertToUpdate] = useState<Alert | null>(null)
  const [alertToDelete, setAlertToDelete] = useState<Alert | null>(null)

  return (
    <Box sx={{  height: 1, display: 'flex', flexDirection: 'column' }}>
      {alertToDelete && (
        <ConfirmDelete 
          title={"Delete Alert"}
          content={`You're about to delete this alert, you can't reverse this action`}
          open={Boolean(alertToDelete)}
          onClose={() => setAlertToDelete(null)}
          onSubmit={async() => {
            try {
              const alert = await handlers.remove(alertToDelete._id);
              console.log('DELETED ALERT >> ', alert);
              setAlertToDelete(null);
              enqueueSnackbar("Alert successfully deleted.", { variant: 'success' })
            } catch (error) {
              console.error(error);
              enqueueSnackbar("Failed to delete alert.", { variant: 'error' })
            }
          }}
        />
      )}

      {alertToUpdate && <AlertFormDialog
        open={true}
        onClose={() => setAlertToUpdate(null)}
        initialValues={alertToUpdate}
        onSubmit={async (data) => {
          console.log(data);
          try {
            const alert = await handlers.update({ _id: alertToUpdate._id, ...data });
            console.log('UPDATED ALERT >> ', alert);
            setAlertToUpdate(null);
            enqueueSnackbar("Alert successfully updated.", { variant: 'success' })
          } catch (error) {
            console.error(error);
            enqueueSnackbar("Failed to update alert.", { variant: 'error' })
          }
        }}
      />}
      
      <AlertFormDialog 
        open={createAlertOpen}
        onClose={createAlertHandlers.close}
        onSubmit={async (data) =>{
          try {
            const alert = await handlers.create(data);      
            console.log(alert);
            createAlertHandlers.close();
            enqueueSnackbar("Alert successfully created.", { variant: 'success' })
          } catch (error) {
            console.error(error);
            enqueueSnackbar("Failed to create alert.", { variant: 'error' })
          }
        }}
      />

      <PageHeader
        title="Alerts"
        onBack={() => router.back()}
        right={
          <IconButton size="small" onClick={createAlertHandlers.open}>
            <AddOutlined />
          </IconButton>
        }
      />

      <Paper
        variant='outlined'
        sx={{
          mt: 2,
          border: 'none',
          flex: 1,
          mb: 2
        }}
      >
        <AlertsTable 
          alerts={alerts}
          onView={(id) => {
            console.log(id);
          }}
          onEdit={(id) => {
            const alert = alerts.find(alert => alert._id == id)
            setAlertToUpdate(alert || null);
          }}
          onDelete={(id) => { 
            const alert = alerts.find(alert => alert._id == id)
            setAlertToDelete(alert || null);
          }}
        />
      </Paper>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  console.log(req.url);
  let alerts: Alert[];

  try {
    alerts = await api.alerts.find({ headers: req.headers });
  } catch (error) {
    console.error(error);
    return handleServerSidePropsRejection(error, '/admin/auth/login');
  }

  return {
    props: {
      alerts,
    }
  }
}

export default Alerts;
