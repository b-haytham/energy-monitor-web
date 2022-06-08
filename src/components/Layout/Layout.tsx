import { useTheme, Box } from "@mui/material";

import Header from "./Header";
import SideBar from "./SideBar";

interface LayoutProps {
  children: React.ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  
  console.log(theme);

  
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Header />
      <SideBar />

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
