import { Box, Typography } from "@mui/material"

interface FooterProps {}

export const Footer = ({}: FooterProps) => {
  return (
    <Box 
      sx={{ p: 6 }}
    >
      <Typography variant="h5"> Footer </Typography>
    </Box>
  )
}

