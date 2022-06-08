import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box } from '@mui/material'
import PageHeader from '@components/PageHeader';

interface RapportsProps {

}

const Rapports: NextPage<RapportsProps> = ({}) => {
  const router = useRouter();
  return (
    <Box>
      <PageHeader
        title='Rapports'
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

export default Rapports;
