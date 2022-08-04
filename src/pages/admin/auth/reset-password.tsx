import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import { 
  Box, 
  Button, 
  Paper, 
  Stack, 
  TextField, 
  Typography, 
  Container,
  InputAdornment,
  IconButton,
} from '@mui/material'

import Link from '@components/Link';

import { useAppDispatch } from '@redux/store';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useDisclosure } from '@mantine/hooks';

interface ResetPasswordProps {}

const ResetPassword = ({}: ResetPasswordProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [passwordVisible, passwordVisibitiy] = useDisclosure(false);
  const [confirmPasswordVisible, confirmPasswordVisibitiy] = useDisclosure(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      password: "",
      confirm_password: "",
    }
  });

  const onSubmit = (data: any) => {
    console.log(data);
  }

  return (
    <Box 
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        px: "100px",
        bgcolor: (theme) => theme.palette.grey[50]
      }}
    >
      <Paper 
        sx={{ 
          justifySelf: 'center', 
          width: 1, 
          py: 4, 
          px: 4, 
          borderRadius: 2, 
          // boxShadow: 10,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
          <motion.img 
            src='/logo.svg' 
            alt="logo" 
            height={50} 
            whileHover={{ rotate: 360 }} 
          /> 
          <Typography variant="subtitle2" fontSize={18} fontWeight={'bold'}>Energy Monitor</Typography>
        </Stack>
        <Typography variant="h4" component="h1" >Reset Password</Typography>
        <Typography variant="subtitle2" component="p">
          {"Please provide your new password in order to continue"}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField 
              id="password" 
              fullWidth 
              label="Password" 
              type={passwordVisible ? "text" : "password"} 
              sx={{ mb: 2 }}
              {...register('password')}  
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={passwordVisibitiy.toggle}>
                      {passwordVisible ? 
                        <VisibilityOffOutlined fontSize="small" /> : 
                        <VisibilityOutlined fontSize="small" />
                      }
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <TextField 
              id="confirm_password" 
              fullWidth 
              label="Confirm Password" 
              type={confirmPasswordVisible ? "text" : "password"} 
              sx={{ mb: 2 }}
              {...register('confirm_password')}  
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={confirmPasswordVisibitiy.toggle}>
                      {passwordVisible ? 
                        <VisibilityOffOutlined fontSize="small" /> : 
                        <VisibilityOutlined fontSize="small" />
                      }
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Stack direction="row" justifyContent="end" sx={{ mb: 2 }}>
              <Box>
                <Link href={"/admin/auth/login"}>
                  Login
                </Link>
              </Box>
            </Stack>
            <Button 
              type='submit' 
              size="large"
              fullWidth
            >
              Submit
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  )
}

export default ResetPassword;
