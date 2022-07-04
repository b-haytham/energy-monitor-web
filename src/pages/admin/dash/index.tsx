import CountCard from "@components/cards/CountCard";
import { AddOutlined } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import { useAppSelector } from "@redux/store";

const Dashboard = ({}) => {
  const subscriptions = useAppSelector(state => state.subscriptions.subscriptions);
  const devices = useAppSelector(state => state.devices.devices);
  const users = useAppSelector(state => state.users.users);
  return (
    <Box>
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
    </Box>
  )
}

export default Dashboard;
