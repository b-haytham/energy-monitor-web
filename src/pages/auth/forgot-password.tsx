import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import Link from '@components/Link';
import { 
  Box, 
  Button, 
  Paper, 
  Stack, 
  TextField, 
  Typography 
} from '@mui/material'

import { useAppDispatch } from '@redux/store';


interface ForgotPasswordProps {}

const ForgotPassword = ({}: ForgotPasswordProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
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
        px: { xs: 2, sm: 4, md: 20 },
        bgcolor: (theme) => theme.palette.grey[50]
      }}
    >
      <Paper 
        sx={{ 
          justifySelf: 'center', 
          width: 1, 
          py: 6, 
          px: 10, 
          borderRadius: 2, 
          // boxShadow: 10,
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <motion.img 
              src='/logo.svg' 
              alt="logo" 
              height={50} 
              whileHover={{ rotate: 360 }} 
            /> 
            <Typography variant="subtitle2" fontSize={18} fontWeight={'bold'}>Energy Monitor</Typography>
          </Stack>
        </Box>
        <Typography variant="h4" component="h1" >Forgot Password ?</Typography>
        <Typography variant="subtitle2" component="p">{"Please provide your email, we'll send reset link"}</Typography>

        <Box sx={{ mt: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField 
              id="email" 
              fullWidth 
              label="Email"
              sx={{ mb: 2 }}
              {...register('email')}
            />
            <Stack direction="row" justifyContent="end" sx={{ mb: 2 }}>
              <Box>
                <Link href={"/auth/login"}>
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

export default ForgotPassword;
