import { Box, Grid, Paper, Typography } from "@mui/material";

interface EnergieOverviewProps {

}

const EnergieOverview = ({} : EnergieOverviewProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" sx={{ minHeight: 100, borderRadius: 3, p: 2 }}>
          <Typography variant="h6" color={"grey.900"}>
            Power (now)
          </Typography>
          <Box >
            <Typography variant="h4">
              0 KW
            </Typography>
          </Box>

        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" sx={{ minHeight: 100, borderRadius: 3, p: 2 }}>
          <Typography variant="h6" color={"grey.900"}>
            Energie Consumption (day)
          </Typography>
          <Box >
            <Typography variant="h4">
              0 KWh
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" sx={{ minHeight: 100, borderRadius: 3, p: 2 }}>
          <Typography variant="h6" >
            Energie Consumption (month)
          </Typography>
          <Box >
            <Typography variant="h4">
              0 KWh
            </Typography>
          </Box>

        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" sx={{ minHeight: 100, borderRadius: 3, p: 2 }}>
          <Typography variant="h6" >
            Energie Consumption (year)
          </Typography>
          <Box >
            <Typography variant="h4">
              0 KWh
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default EnergieOverview;
