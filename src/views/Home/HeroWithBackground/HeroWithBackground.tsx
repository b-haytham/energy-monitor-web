import CurveShapeDivider from "@components/CurveShapeDivider"
import { Box, Typography } from "@mui/material"
import Image from "next/image"


const HeroWithBackground = () => {
  return (
    <Box
      sx={{ 
        minHeight: "100vh",
        position: "relative"
      }}
    >
      <div style={{ position: 'absolute', width: '100vw', height: '100vh', zIndex: -1 }}>
        <Image
          src="/images/electricity.jpg"
          alt="electricity"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography color="common.white">Hello</Typography>
      </Box>
      <CurveShapeDivider />
    </Box>
  )
}

export default HeroWithBackground
