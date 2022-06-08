import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box } from '@mui/material'
import PageHeader from '@components/PageHeader';

interface AlertsProps {

}

const Alerts: NextPage<AlertsProps> = () => {
  const router = useRouter();
  return (
    <Box>
      <PageHeader
        title="Alerts"
        onBack={() => router.back()}
      />
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

export default Alerts;
