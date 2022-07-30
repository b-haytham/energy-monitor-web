import { Box, Grid, Typography } from "@mui/material"

import FeatureCard from "./FeatureCard";
import { features } from './features';

interface FeaturesSectionProps {}

const FeaturesSection = ({}: FeaturesSectionProps) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        mt: 10
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ mb: 2 }} variant="h2"> What Power Monitor really is ?</Typography>
        <Typography variant="body1" fontSize={25}> Features Provided </Typography>
      </Box>
      <Grid container spacing={2} sx={{ mt: 3, px: {xs: 2, sm: 5, md: 5, lg: 25 }}}>  
        {features.map((feature, idx) => (
          <Grid key={idx} item xs={12} sm={12} md={4} lg={4}>
            <FeatureCard 
              feature={feature} 
              index={idx}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default FeaturesSection
