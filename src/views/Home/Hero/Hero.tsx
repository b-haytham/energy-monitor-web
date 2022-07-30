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
      <Grid item xs={12} sm={12} md={6} alignSelf={'center'} justifyItems="center">
        <Stack alignItems={'center'}>
          <Box>
          <Typography 
            variant="h1" 
            fontSize={55} 
            sx={{  
              textAlign: { xs: 'center', sm: 'center', md: 'start' }
            }} 
          >
            Power Monitor
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
             Energy Management Software solutions to process, analyze, store and share energy usage and status informations.
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
        <Stack alignItems="center">
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
  // return (
  //   <Stack 
  //     alignItems="center" 
  //     sx={{ 
  //       flexDirection: { xs: 'column-reverse', sm: 'column-reverse', md: 'row' },
  //       minHeight: '100vh', 
  //       position: 'relative', 
  //       justifyContent: 'center',
  //       pt: { xs: '60px', sm: '60px', md: 0 },
  //       // bgcolor: '#020c36' 
  //     }}
  //   >
  //     <Box 
  //       sx={{ 
  //         flex: .6, 
  //         p: { xs: 2, sm: 2, md:  10 }
  //       }}
  //     >
  //       <Typography variant="h1" fontSize={55} /* color="common.white" */>Power Monitor</Typography>
  //       <Typography sx={{ ml: 0.7, my: 5, mr: 5, maxWidth: { md: 500 }  }} variant="body1" fontSize={25} /* color="common.white" */>
  //         Energy Management Software solutions to process, analyze, store and share energy usage and status informations.
  //       </Typography>
  //       <Button 
  //         variant="text" 
  //         size="large"
  //         // color="inherit"
  //         sx={{
  //           // mt: 5,
  //           // color: 'black',
  //           borderRadius: 2,
  //           fontSize: 25
  //         }}
  //         endIcon={<ArrowForwardOutlined />}
  //       >  
  //         Learn More
  //       </Button>
  //     </Box>
  //     <Box 
  //       sx={{ 
  //         flex: .4, 
  //         display: 'flex', 
  //         justifyContent: 'center', 
  //         perspective: 1000,
  //         px: 5,
  //       }}
  //     >
  //       <Box sx={{ }}>
  //         <motion.img
  //           src='/logo.svg'
  //           alt="logo"
  //           style={{
  //             // width: '80%'
  //           }}
  //           animate={{ 
  //             scale: [.9, 1, .9],
  //           }}
  //           transition={{ repeat: Infinity, duration: 6 }}
  //         />
  //       </Box>
  //     </Box>
  //     <CurveShapeDivider />
  //   </Stack>
  // )
}

export default Hero;
