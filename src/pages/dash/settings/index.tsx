import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box } from '@mui/material'

import PageHeader from '@components/PageHeader';

interface SettingsProps {
  
}

const Settings: NextPage<SettingsProps> = ({}) => {
  const router = useRouter();
  return (
    <Box>
      <PageHeader
        title='Settings'
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

export default Settings;
