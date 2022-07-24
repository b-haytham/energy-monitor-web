import { motion } from 'framer-motion';

import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { ArrowForwardOutlined } from '@mui/icons-material';

import Link from '@components/Link';

import { useAppSelector } from '@redux/store';

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const loggedInUser = useAppSelector(state => state.auth.user);
  return (
    <AppBar
      position='fixed' 
      variant="outlined" 
      elevation={0} 
      color="inherit"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <motion.img 
              src='/logo.svg' 
              alt="logo" 
              height={40} 
              whileHover={{ rotate: 360 }} 
            /> 
            <Typography variant="subtitle2" fontSize={18} fontWeight={'bold'}>Power Monitor</Typography>
          </Stack>
          {/*<Typography variant="h6" color="inherit">
            Engy
          </Typography> */ }
        </Stack>
        <Stack direction="row" spacing={2}>
          {loggedInUser ? (
            <Button
              LinkComponent={Link}
              href={loggedInUser.role.includes('admin') ? '/admin/dash' : '/dash'}
              endIcon={<ArrowForwardOutlined />}
            >
              Dashboard
            </Button>
          ) : (
            <Button
              LinkComponent={Link}
              href={'/auth/login'}
              endIcon={<ArrowForwardOutlined />}
            >
              Login
            </Button>
          )}
        </Stack>
     </Toolbar>
    </AppBar>
  )
}

export default Header;
