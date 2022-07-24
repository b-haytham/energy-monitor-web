import CountCard from "@components/cards/CountCard";
import { AddOutlined } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useAppSelector } from "@redux/store";

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

export default Dashboard;
