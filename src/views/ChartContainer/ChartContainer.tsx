import { Paper, PaperProps } from "@mui/material";

interface ChartContainerProps extends PaperProps {}

const ChartContainer = ({sx, ...rest} : ChartContainerProps) => {
  return (
    <Paper 
      variant="outlined"
      sx={{
        padding: 2,
        borderRadius: 3,
        ...sx
      }}
      {...rest}
    >
    
    </Paper>
  )
}

export default ChartContainer;
