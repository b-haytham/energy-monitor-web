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
import { useSubscriptions } from 'src/hooks/useSubscriptions';
import { useState } from 'react';

interface SubscriptionsProps {
  subscriptions: Subscription[]
}

const Subscriptions = ({ subscriptions: serverSubscriptions }: SubscriptionsProps) => {
  const router = useRouter()
  const { subscriptions, handlers } = useSubscriptions(serverSubscriptions);
  const [createSubscriptionOpen, createSubscriptionHandlers] = useDisclosure(false);

  const [subscriptionToUpdate, setSubscriptionToUpdate] = useState<Subscription | null>(null)

  return (
    <Box>
      <SubscriptionFormDialog
        open={createSubscriptionOpen}
        onClose={createSubscriptionHandlers.close}
        onSubmit={async (data) => {
          try {
            const subscription = await handlers.create(data);
            console.log(subscription);
            createSubscriptionHandlers.close();
          } catch (error) {
            console.error(error);
          }
        }}
      />

      {subscriptionToUpdate && <SubscriptionFormDialog
        open={true}
        onClose={() => setSubscriptionToUpdate(null)}
        initialValues={subscriptionToUpdate}
        onSubmit={async (data) => {
          console.log(data);
          try {
            await handlers.update({_id: subscriptionToUpdate._id, ...data}); 
            setSubscriptionToUpdate(null);
          } catch (error) {
            console.error(error);
          }
        }}
      />}

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
        <SubscriptionsTable
          subscriptions={subscriptions}
          onView={(id) => {
            router.push('/admin/dash/subscriptions/[id]', `/admin/dash/subscriptions/${id}`);
          }}
          onEdit={(id) => { 
            const subscription = subscriptions.find(sub => sub._id == id);
            setSubscriptionToUpdate(subscription || null);
          }}
          onDelete={(id) => { }}
        />
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
