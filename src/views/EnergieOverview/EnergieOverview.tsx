import api from "@api";
import { Subscription } from "@api/types/subscription";
import { Box, Grid, GridProps, Paper, Skeleton, Typography } from "@mui/material";
import { useAppSelector } from "@redux/store";
import { useQuery } from "react-query";

interface EnergieOverviewProps extends GridProps {
  subscription?: string
}

const OverviewLoadingSkeleton = () => (
  <Paper variant="outlined" sx={{ minHeight: 100, borderRadius: 3, p: 2 }}>
    <Skeleton variant="text" width={200} />
    <Skeleton variant="text" width={50} />
  </Paper>
)

const EnergieOverview = ({ subscription, ...rest} : EnergieOverviewProps) => {
  const foundSubscription = useAppSelector(state => {
    const subsc = state.subscriptions.subscriptions
      .find(sub => sub._id == subscription);
    return subsc || null;
  })
  
  const devices = useAppSelector(state => state.devices.devices
    .filter(dev => (dev.subscription as Subscription)._id == subscription));

  console.log(devices);
  const { 
    data: powerConsumptionLastDay, 
    isLoading: powerConsumptionLastDayLoading 
  } = useQuery(['power-consumtion-day'], () =>  {
    const promises = devices.map(dev => api.data.overview({ d: dev._id, s: subscription || "", t: '1d' }))
    return Promise.all(promises).then(results => {
      console.log("RESULT DAY >>", results);
      const latest = results.map(res => res.slice(-1)).filter(res => res.length > 0).map(res => res[0])
      return latest.reduce((prev, curr) => prev + curr.consumed, 0);
    })
    // return Promise.all(promises);
  })

  const { 
    data: powerConsumptionLastMonth, 
    isLoading: powerConsumptionLastMonthLoading 
  } = useQuery(['power-consumtion-month'], () =>  {
    const promises = devices.map(dev => api.data.overview({ d: dev._id, s: subscription || "", t: '1m' }))
    return Promise.all(promises).then(results => {
      console.log("RESULT DAY >>", results);
      const latest = results.map(res => res.slice(-1)).filter(res => res.length > 0).map(res => res[0])
      return latest.reduce((prev, curr) => prev + curr.consumed, 0);
    })
    // return Promise.all(promises);
  })

  console.log("Power last day", powerConsumptionLastDay);
  console.log("Power last month", powerConsumptionLastMonth);

  const power = devices.reduce((prev, curr) => prev + curr.power , 0)
  return (
    <Grid container spacing={2} {...rest}>
      <Grid item xs={12} md={4}>
        <Paper variant="outlined" sx={{ minHeight: 100, borderRadius: 3, p: 2 }}>
          <Typography variant="h6" color={"grey.900"}>
            Power 
          </Typography>
          <Box >
            <Typography variant="h4">
              {power.toFixed(2)} KW
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        {powerConsumptionLastDayLoading && <OverviewLoadingSkeleton />}
        {!powerConsumptionLastDayLoading && <Paper variant="outlined" sx={{ minHeight: 100, borderRadius: 3, p: 2 }}>
          <Typography variant="h6" color={"grey.900"}>
            Power Consumption (today)
          </Typography>
          <Box >
            <Typography variant="h4">
              {powerConsumptionLastDay?.toFixed(2)} Kw/h
            </Typography>
          </Box>
        </Paper>}
      </Grid>
      <Grid item xs={12} md={4}>
        {powerConsumptionLastMonthLoading && <OverviewLoadingSkeleton />}
        {!powerConsumptionLastMonthLoading && <Paper variant="outlined" sx={{ minHeight: 100, borderRadius: 3, p: 2 }}>
          <Typography variant="h6" >
            Power Consumption (this month)
          </Typography>
          <Box >
            <Typography variant="h4">
              {powerConsumptionLastMonth?.toFixed(2)} KWh
            </Typography>
          </Box>

        </Paper>}
      </Grid>
    </Grid>
  )
}

export default EnergieOverview;
