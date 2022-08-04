import { GetServerSideProps } from "next";

import { Box, Grid, Paper, Typography } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

import CountCard from "@components/cards/CountCard";

import { useAppSelector } from "@redux/store";
import { handleServerSidePropsRejection } from "@utils/errors";

import api from "@api";
import { User } from "@api/types/user";

const Dashboard = ({}) => {
  const subscriptions = useAppSelector(state => state.subscriptions.subscriptions);
  const devices = useAppSelector(state => state.devices.devices);
  const users = useAppSelector(state => state.users.users);
  return (
    <Box sx={{  height: 1, display: 'flex', flexDirection: 'column' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <CountCard 
            title={"Subscriptions"}
            count={subscriptions.length}
            icon={<AddOutlined />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CountCard 
            title={"Devices"}
            count={devices.length}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CountCard 
            title={"Users"}
            count={users.length}
          />
        </Grid>
      </Grid>
      <Paper 
        sx={{ 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 2,
          my: 2,
          p: 2,
          height: 1
        }}
      >
        <Typography variant="subtitle1">Not Implemented Yet</Typography>
      </Paper>
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
    return handleServerSidePropsRejection(error, '/admin/auth/login')
  }
  return {
    props: {}
  }
}

export default Dashboard;
