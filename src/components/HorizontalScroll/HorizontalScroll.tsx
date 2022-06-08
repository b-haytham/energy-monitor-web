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
    <div
      style={{
        overflow: 'auto',
        whiteSpace: 'nowrap',
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
     </div>
    </Box>
  )
}

export default HorizontalScroll;
