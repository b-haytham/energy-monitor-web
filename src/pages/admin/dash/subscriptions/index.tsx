import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { Box, Button, Paper } from '@mui/material'
import { useDisclosure } from '@mantine/hooks';

import PageHeader from '@components/PageHeader';
import SubscriptionsTable from '@components/tables/SubscriptionsTable';
import { SubscriptionFormDialog } from '@components/forms/SubscriptionForm';

import api from '@api';

import { Subscription } from '@api/types/subscription';
import { handleServerSidePropsRejection } from '@utils/errors';

interface SubscriptionsProps {
  subscriptions: Subscription[]
}

const Subscriptions = ({ subscriptions }: SubscriptionsProps) => {
  const router = useRouter()
  const [createSubscriptionOpen, createSubscriptionHandlers] = useDisclosure(false);
  return (
    <Box>
      <SubscriptionFormDialog 
        open={createSubscriptionOpen}
        onClose={createSubscriptionHandlers.close}
        onSubmit={async (_) => {}}
      />
      <PageHeader 
        title="Subscriptions" 
        onBack={() => router.back()} 
        right={
          <Button
            color="primary"
            variant="outlined"
            onClick={createSubscriptionHandlers.open}
          >
            Add Subscription
          </Button>
        }
      />
      <Paper variant="outlined" sx={{ mt: 2, height: 500, border: 'none' }}>
        <SubscriptionsTable subscriptions={subscriptions} />
      </Paper>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  console.log(req.url);
  let subscriptions: Subscription[];
  try {
    subscriptions = await api.subscriptions.find({ headers: req.headers, params: { p: "admin,devices,users" } });
    console.log('Server ', subscriptions);
  } catch (error) {
    return handleServerSidePropsRejection(error);
  }
  return {
    props: {
      subscriptions
    }
  }
}

export default Subscriptions;
