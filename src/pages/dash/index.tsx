import { NextPage, GetServerSideProps } from 'next';

import { Box } from '@mui/material'

import EnergieOverview from '@views/EnergieOverview';
import ChartContainer from '@views/ChartContainer';
import TotalEnergieConsumptionChart from '@components/charts/TotalEnergieConsumptionChart';
import DevicesOverviewSection from '@views/DevicesOverviewSection';

import { useAppSelector } from '@redux/store';
import { handleServerSidePropsRejection } from '@utils/errors';

import api from '@api';
import { Subscription } from '@api/types/subscription';
import { User } from '@api/types/user';

const Dashboard: NextPage = ({}) => {
  const loggedInUser = useAppSelector(state => state.auth.user);
  // console.log(loggedInUser);
  const devices = useAppSelector(state => state.devices.devices);
  return (
    <Box sx={{ height: '100%' }}>
      <EnergieOverview subscription={(loggedInUser?.subscription as Subscription)?._id} />

      <ChartContainer
        sx={{ height: 500, mt: 2 }}
      >
        {loggedInUser && <TotalEnergieConsumptionChart 
          subscription={(loggedInUser.subscription as Subscription)._id}
          devices={devices}
        />}
      </ChartContainer>
      
      <DevicesOverviewSection 
        devices={devices} 
        ContainerProps={{ sx: { my: 2 } }} 
      />
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let user: User;
  try {
    user = await api.auth.me({ headers: req.headers });
    console.log("Server >>", user);
  } catch (error) {
    console.error(error);
    return handleServerSidePropsRejection(error, '/auth/login')
  }
  return {
    props: {}
  }
}

export default Dashboard;
