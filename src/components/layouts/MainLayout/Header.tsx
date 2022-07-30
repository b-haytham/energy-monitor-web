import { motion, useScroll, useTransform } from 'framer-motion';

import { 
  Button, 
  Stack, 
  Toolbar, 
  useTheme 
} from "@mui/material";
import { ArrowForwardOutlined } from '@mui/icons-material';

import Link from '@components/Link';
import { MotionAppBar, MotionStack, MotionTypography } from '@components/animated';

import { useAppSelector } from '@redux/store';

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const theme = useTheme();

  const loggedInUser = useAppSelector(state => state.auth.user);
  const { scrollYProgress } = useScroll();
  const appBarWidth = useTransform(scrollYProgress, [0, .1], ["100%", '90%'])
  const appBarTop = useTransform(scrollYProgress, [0, .1], [0, 20])
  const appBarMargin = useTransform(scrollYProgress, [0, .1], ['0%', '5%'])
  const appBarRadius = useTransform(scrollYProgress, [0, .1], [0, 15])
  const appBarborder = useTransform(scrollYProgress, [0, .1], ['none', '1px solid white'])
  // const appBarMargin = useTransform(scrollYProgress, [0, .1], ['0%', '5%'])
  // const appBackground = useTransform(scrollYProgress, [0, .1], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.24)'])
  const appBackground = useTransform(scrollYProgress, [0, .1], ['rgba(255, 255, 255, 0)', 'rgba(2, 12, 54, 0.7)'])

  // const typographyColor = useTransform(scrollYProgress, [0, .1], [theme.palette.common.white, theme.palette.text.primary])  
  const typographyColor = useTransform(scrollYProgress, [0, .1], [theme.palette.text.primary, theme.palette.common.white ])  

  return (
    <MotionAppBar
      position='fixed' 
      variant="outlined" 
      elevation={0} 
      color="inherit"
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: 'transparent',
        borderBottom: 'none'
      }}
      style={{ 
        width: appBarWidth,
        top: appBarTop,
        marginLeft: appBarMargin,
        marginRight: appBarMargin,
        border: appBarborder,
        borderRadius: appBarRadius,
        backdropFilter: 'blur(8px)',
        background: appBackground
        //   
      }}
      // whileHover={{
      //   position: 'absolute',
      //   backdropFilter: 'blur(8px)',
      //   width: '90%',
      //   top: 20,
      //   marginLeft: "5%",
      //   marginRight: "5%"
      // }}
      transition={{ type: 'tween' }}
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
            <MotionTypography 
              variant="subtitle2" 
              fontSize={18} 
              fontWeight={'bold'} 
              style={{ color: typographyColor }} 
              transition={{ type: 'tween' }}
            >
              Power Monitor
            </MotionTypography>
          </Stack>
          {/*<Typography variant="h6" color="inherit">
            Engy
          </Typography> */ }
        </Stack>
        <MotionStack 
          direction="row" 
          spacing={2} 
          style={{ color: typographyColor }}
          transition={{ type: 'tween' }}
        >
          {loggedInUser ? (
            <Button
              LinkComponent={Link}
              href={loggedInUser.role.includes('admin') ? '/admin/dash' : '/dash'}
              endIcon={<ArrowForwardOutlined />}
              color="inherit"
            >
              Dashboard
            </Button>
          ) : (
            <Button
              LinkComponent={Link}
              href={'/auth/login'}
              endIcon={<ArrowForwardOutlined />}
              color="inherit"
            >
              Login
            </Button>
          )}
        </MotionStack>
     </Toolbar>
    </MotionAppBar>
  )
}

export default Header;
