import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { 
  Box, 
  Button, 
  Grid, 
  IconButton, 
  InputAdornment, 
  Stack, 
  TextField, 
  Typography 
} from '@mui/material'

import { 
  VisibilityOffOutlined, 
  VisibilityOutlined 
} from '@mui/icons-material';

import Link from '@components/Link';

import { login } from '@redux/auth/actions';
import { fetchAll } from '@redux/global/actions';
import { useAppDispatch, useAppSelector } from '@redux/store';

import socket from 'src/socket';
import { useDisclosure } from '@mantine/hooks';
import { useSnackbar } from 'notistack';

interface LoginProps {}

const Login = ({}: LoginProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const globalLoading = useAppSelector(state => state.global.loading);
  const loading = useAppSelector(state => state.auth.loading);

  const { enqueueSnackbar } = useSnackbar();
  const [passwordVisible, passwordVisibitiy] = useDisclosure(false);
  
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (data: any) => {
    dispatch(login(data))
      .unwrap()
      .then(({ user, access_token }) => {
        if(user.role.includes('user')) throw new Error("Login page for admins")
        dispatch(fetchAll(user))
        .unwrap()
        .then(() => {
          socket.emit('authenticate', { access_token });
          router.push('/admin/dash');
        })
      })
      .catch(err => {
        enqueueSnackbar(err.message || "Something Wen't Wrong!", { variant: 'error' });
        console.error(err);
      });
  }

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={12} md={6}  sx={{ p: { xs: 3, sm: 10 ,md: 10 } }}  alignSelf={'center'}>
        <Box sx={{ my: 'auto' }}>
          <Typography variant="h3" component="h1">Login To Engy</Typography>
          <Typography variant="subtitle2" component="p">Please provide your credentials</Typography>

          <Box sx={{ mt: 4 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField 
                id="email" 
                fullWidth 
                label="Email"
                sx={{ mb: 2 }}
                {...register('email')}
              />
              <TextField 
                id="password" 
                fullWidth 
                label="Password" 
                type={passwordVisible ? "text" : "password"} 
                sx={{ mb: 2 }}
                {...register('password')}  
                InputProps={{
                  sx: { borderRadius: 2 },
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
              <Stack direction="row" justifyContent="end" sx={{ mb: 2 }}>
                <Box>
                  <Link href={"/admin/auth/forgot-password"}>
                    Forgot password ?
                  </Link>
                </Box>
              </Stack>
              <Button 
                type='submit' 
                size="large"
                fullWidth
                disabled={globalLoading || loading}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Grid>
      <Grid 
        item 
        xs={0} 
        sm={0} 
        md={6} 
        sx={{ 
          bgcolor: (theme) => theme.palette.grey[50]
        }}
      >
      </Grid>
    </Grid>
  )
}

export default Login;
