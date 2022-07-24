import { useTheme, Box, useMediaQuery } from "@mui/material";
import { useState } from "react";

import Header from "./Header";
import SideBar from "./SideBar";

interface LayoutProps {
  children: React.ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  const matchesDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(!matchesDownMd);
  
  const handleOpen = () => setDrawerOpen(true);

  const handleClose = () => setDrawerOpen(false);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Header 
        open={drawerOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      
      <SideBar open={drawerOpen} />

      <Box 
        component={'main'} 
        bgcolor={theme.palette.grey[50]}
        sx={{ flexGrow: 1, pt: 'calc(64px + 16px)', px: 2 }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
