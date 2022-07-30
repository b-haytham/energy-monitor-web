import React, { useRef } from "react";
import { motion, useScroll, useTransform } from 'framer-motion';

import { Box, Stack, Typography, BoxProps, Button } from "@mui/material";
import { ArrowForwardOutlined } from "@mui/icons-material";
import { MotionBox } from "@components/animated";

interface ImagesSectionProps {}

const ImagesSection = ({}: ImagesSectionProps) => {
  const sectionRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  })
    
  const rotate1Y = useTransform(scrollYProgress, [0.2, 1], [0, 20])
  const rotate2Y = useTransform(scrollYProgress, [0.2, 1], [0, -20])

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        mt: 10
      }}
    >
    {/*<Box>
      <Typography variant="h3" textAlign="center">dashboard-2</Typography>
    </Box> */ }
    <Stack 
      ref={sectionRef}
      direction={'row'} 
      alignItems="center"
      
      sx={{ position: 'relative', }}
    >
      <MotionBox 
        layout
        // sx={{ flex: 1, display: 'flex', justifyContent: 'center', perspective: 1000  }}
        style={{ flex: 1, display: 'flex',  justifyContent: 'center', perspective: 1000  }}
      >
        <motion.img
          src='/dashboard-1.png'
          alt="logo"
          style={{ 
            width: '70%', 
            rotateY: rotate1Y,
          }}
          transition={{}}
        />
      </MotionBox>
      <MotionBox 
        layout
        style={{ flex: 1, display: 'flex', justifyContent: 'center', perspective: 1000 }}
        // sx={{ flex: 1, display: 'flex', justifyContent: 'center', perspective: 1000  }}
      >
        <motion.img
          src='/dashboard-2.png'
          alt="logo"
          style={{ width: '70%', rotateY: rotate2Y }}
          transition={{}}
        />
      </MotionBox>
    </Stack>
    <Box 
      sx={{ 
        mt: 5,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: "90%", sm: '80%', md: '70%' },
          mt: 5
        }}
      >
        <Typography variant="h3" textAlign="center" sx={{ mb: 5 }}>
          Elegant Dashboad makes you closer to your machines
        </Typography>

        <Typography variant="body1" fontSize={25} textAlign="center">
          Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation ame.
        </Typography>
        <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
          <Button 
            variant="text"
            size="large"
            endIcon={<ArrowForwardOutlined />}
            sx={{ fontSize: 25 }}
          >
            Get Started
          </Button>
        </Stack>
      </Box>
    </Box> 
    </Box>
  )
}

export default ImagesSection;
