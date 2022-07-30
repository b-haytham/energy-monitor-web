import Logo from "@components/Logo"
import { Box, Divider } from "@mui/material"

interface FooterProps {}

const Footer = ({}: FooterProps) => {
  return (
    <Box 
      sx={{ pt: 10, px: { xs: 2, sm: 2, md:  10 } }}
    >
      <Divider />
      <Box sx={{ py: 5 }}>
        <Logo width={100} height={100} />
      </Box>
    </Box>
  )
}

export default Footer;
