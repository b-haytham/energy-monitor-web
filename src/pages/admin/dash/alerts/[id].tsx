import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router";

import { Box, Paper } from "@mui/material";

import PageHeader from "@components/PageHeader";
import { handleServerSidePropsRejection } from "@utils/errors";
import api from "@api";
import { Alert } from "@api/types/alert";
import { TriggeredAlert } from "@api/types/triggered-alert";
import TriggeredAlertsTable from "@components/tables/TriggeredAlertsTable";

interface AlertDetailsPageProps {
  alert: Alert;
  triggeredAlerts: TriggeredAlert[];
}

const AlertDetailsPage: NextPage<AlertDetailsPageProps> = ({ alert, triggeredAlerts }) => {
  const router = useRouter();
  return (
    <Box sx={{  height: 1, display: 'flex', flexDirection: 'column' }}>
      <PageHeader
        title="Alert Detail"
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
        <TriggeredAlertsTable 
          triggeredAlerts={triggeredAlerts}
          alert={alert}
        />
      </Paper>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  let alert: Alert;
  let triggeredAlerts: TriggeredAlert[];
  try {
    const res = await api.alerts.findTriggeredAlerts(params!.id as string, { headers: req.headers });
    alert = res.alert;
    triggeredAlerts = res.triggeredAlerts;

    console.log('Alert >> ', alert);
    console.log("Triggered Alerts >>", triggeredAlerts);
  } catch (error) {
    console.error(error);
    return handleServerSidePropsRejection(error, '/auth/login');
  }

  return {
    props: {
      alert,
      triggeredAlerts,
    }
  }
}

export default AlertDetailsPage;
