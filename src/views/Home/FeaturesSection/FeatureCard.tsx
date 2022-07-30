import { MotionBox, MotionStack, MotionTypography } from "@components/animated";
import { Box, Stack, StackProps, Typography } from "@mui/material"
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { Feature } from "./features"

interface FeatureCardProps extends StackProps {
  feature: Feature;
  index: number;
}

const FeatureCard = ({ index, feature, sx, ...rest }: FeatureCardProps) => {
  const sectionRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  })

  const translateX = useTransform(scrollYProgress, [0, 1], [index % 2 == 0 ? -50 : 50 , 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  const iconScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <MotionStack 
      //@ts-ignore
      ref={sectionRef}
      style={{
        translateY: translateX,
        opacity: opacity
      }}
      transition={{
        delay: index * 0.3,
        duration: 5
      }}
      sx={{
        p: 3,
        borderRadius: 2,
        border: 3,
        borderColor: (theme) => theme.palette.primary.dark,
        // borderColor: '#020c36',
        height: 1,
        position: 'relative',
        overflow: 'visible',
        ...sx,
      }}
      {...rest}
    >
      <MotionBox style={{ scale: iconScale }} sx={{ mb: 5 }}>
        {feature.icon}
      </MotionBox>
      <MotionTypography variant="subtitle1" fontSize={20} sx={{ mb: 2 }}>{feature.title}</MotionTypography>
      <MotionTypography variant="body1" fontSize={18}>{feature.description}</MotionTypography> 
    </MotionStack>
  )
}

export default FeatureCard
