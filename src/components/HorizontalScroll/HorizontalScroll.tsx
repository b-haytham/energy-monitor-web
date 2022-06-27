import { Box, BoxProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import  { ReactNode } from "react";

interface HorizontalScrollProps {
  children: ReactNode
  spacing: number,
  ContainerProps?: BoxProps,
  ChildProps?: BoxProps
  
}

const HorizontalScroll = ({ children, spacing, ContainerProps, ChildProps }: HorizontalScrollProps) => {
  const theme = useTheme();
  return (
    <Box
      component="div"
      style={{
        display: 'grid',
        width: "100%"
      }}
      {...ContainerProps}
    > 
    <Box
      style={{
        overflow: 'auto',
        whiteSpace: 'nowrap',
      }}
      sx={{
        '&::-webkit-scrollbar': {
          height: 4,
        },
        '&::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: (theme) => theme.palette.primary.light,
          borderRadius: 8
        }
      }}
    >
      {Array.isArray(children) && children.map((child, idx) => (
        <Box
          key={idx}
          component="div"
          style={{
            display: 'inline-block',
            marginRight:  theme.spacing(spacing),
          }} 
          {...ChildProps}
        >
          {child}
        </Box>
        )) }
     </Box>
    </Box>
  )
}

export default HorizontalScroll;
