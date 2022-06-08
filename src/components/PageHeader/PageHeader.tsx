import { Box, IconButton, Paper, Typography } from "@mui/material"

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

interface PageHeaderProps {
 title: string
 subtitle?: string
  
 right?: React.ReactNode

 onBack?: () => void
}

export const PageHeader = ({ title, subtitle, onBack, right }: PageHeaderProps) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
    <Box 
      sx={{ 
        display: "flex",
        alignItems: "center",
      }}
    >
      {onBack && (
        <IconButton size="small" onClick={onBack} sx={{ mr: 2 }}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        )
      }
      <Box>
      <Typography variant="h6">{title}</Typography>
        {subtitle && (<Typography variant="body2">{subtitle}</Typography>)}
      </Box>
    </Box>
    {right && right}
    </Paper>
  )
}

export default PageHeader;
