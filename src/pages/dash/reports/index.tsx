import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box, Paper } from '@mui/material'

import PageHeader from '@components/PageHeader';
import ReportsTable from '@components/tables/ReportsTable';

import { handleServerSidePropsRejection } from '@utils/errors';

import api from '@api';
import { Report } from '@api/types/reports';

interface RapportsProps {
  reports: Report[];
}

const Rapports: NextPage<RapportsProps> = ({ reports }) => {
  const router = useRouter();

  return (
    <Box sx={{  height: 1, display: 'flex', flexDirection: 'column' }}>
      <PageHeader
        title='Reports'
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
        <ReportsTable
          reports={reports}
          onView={(id) => {
            console.log(id);
          }}
          onEdit={(id) => {
            console.log(id);
          }}
          onDelete={(id) => { 
            console.log(id);
          }}
        />
      </Paper>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let reports: Report[];
  try {
    reports = await api.reports.find({ headers: req.headers })
    console.log('Server ', reports);
  } catch (error) {
    return handleServerSidePropsRejection(error, '/auth/login');
  }
  return {
    props: {
      reports,
    }
  }
}

export default Rapports;
