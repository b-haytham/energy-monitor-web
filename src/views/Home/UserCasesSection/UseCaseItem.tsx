import { MotionGrid, MotionTypography } from "@components/animated"
import { Box, Grid } from "@mui/material"
import { useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { SvgBlob } from "react-svg-blob"
import { UserCase } from "./useCases"

interface UseCaseItemProps {
  useCase: UserCase,
  index: number
}

const UseCaseItem = ({ useCase, index }: UseCaseItemProps) => {
  const sectionRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  })
    
  const imageScale = useTransform(scrollYProgress, [0.2, 1], [.5, 1])

  const titleOpacity = useTransform(scrollYProgress, [0.2, 1], [0, 1])
  const descriptionOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1])
  const textTranslateY = useTransform(scrollYProgress, [0.8, 1], [-20, 0])

  return (
    <Grid  
      ref={sectionRef}
      container 
      direction={index % 2 == 0 ? 'row' : 'row-reverse' } 
      sx={{ my: 5, px: { xs: 5, sm: 5, md: 10 } }}
    >
      <MotionGrid 
        item 
        xs={12} 
        sm={12} 
        md={4} 
        sx={{ p: { xs: 10, sm: 10, md: 5 } }} 
        style={{
          //@ts-ignore
          scale: imageScale
        }}
      >
        <SvgBlob 
          variant="image"
          image={useCase.image}
          width="100%"
          height="100%"
          shapeProps={{
            growth: 9,
            edges: 25,
            size: 300,
          }}
        />
      </MotionGrid>
      <Grid item xs={12} sm={12} md={8} alignSelf="center"> 
      <Box sx={{ flex: 1, px: { xs: 0, sm: 0, md: 10 } }}> 
        <MotionTypography 
          variant="h3" 
          sx={{ 
            mb: 3, 
            textAlign: { xs: 'center', sm: 'center', md: 'start' } 
          }}
          style={{
            //@ts-ignore
            opacity: titleOpacity,
            //@ts-ignore
            translateY: textTranslateY
          }}
        >
          {useCase.title}
        </MotionTypography>
        <MotionTypography 
          variant="body1" 
          fontSize={20} 
          sx={{ 
            textAlign: { xs: 'center', sm: 'center', md: 'start' } 
          }}
          style={{
            //@ts-ignore
            opacity: descriptionOpacity,
            //@ts-ignore
            translateY: textTranslateY
          }}
          transition={{
            delay: 1
          }}
        >
          {useCase.description}
        </MotionTypography>
      </Box>
      </Grid>
    </Grid>
  )
}

export default UseCaseItem
