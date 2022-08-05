import { motion } from 'framer-motion';

import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { ArrowForwardOutlined } from "@mui/icons-material";


interface HeroProps {}

const Hero = ({}: HeroProps) => {
  return (
    <Grid 
      container 
      sx={{
        minHeight: '100vh',
        px: 10,
        pt: { xs: 10, sm: 10, md: 0 }
      }}
    >
      <Grid item xs={12} sm={12} md={6} alignSelf={'center'} justifyItems="start">
        <Stack alignItems={'start'}>
          <Box>
          <Typography 
            variant="h1" 
            fontSize={55} 
            sx={{  
              textAlign: { xs: 'center', sm: 'center', md: 'start' }
            }} 
          >
            Energy Monitor
          </Typography>
          <Typography 
            sx={{ 
              ml: 0.7, 
              my: 5, 
              mr: 5, 
              maxWidth: { md: 500 },
              textAlign: { xs: 'center', sm: 'center', md: 'start' }
            }} 
            variant="body1" 
            fontSize={25}
          >
             Energy Management Software solutions to process, analyze, store and share energy usage.
          </Typography>
          <Stack 
            direction="row" 
            sx={{ 
              justifyContent: { xs: 'center', sm: 'center', md: 'start' } 
            }}
          >
            <Button 
               variant="text" 
               size="large"
               // color="inherit"
               sx={{
                 // mt: 5,
                 // color: 'black',
                 borderRadius: 2,
                 fontSize: 25
               }}
               endIcon={<ArrowForwardOutlined />}
            >  
               Learn More
            </Button>
          </Stack>
         </Box>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={12} md={6} alignSelf={'center'} justifyItems="center">
        <Stack alignItems="end">
           <motion.img
             src='/logo.svg'
             alt="logo"
             style={{
               // width: '80%'
             }}
             animate={{ 
               scale: [.9, 1, .9],
             }}
             transition={{ repeat: Infinity, duration: 6 }}
           />
         </Stack>
      </Grid>
    </Grid>
  )
}

export default Hero;
