import React from "react";

import { Box } from "@mui/material";
import Header from "./Header";
import { Footer } from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box
      sx={{
        // display: "flex",
        // minHeight: "100vh",
      }}
    >
      <Header />
      <Box 
        sx={{ 
          display: "flex",
          minHeight: "100vh",
          bgcolor: 'red'
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  )
}

export default MainLayout;
