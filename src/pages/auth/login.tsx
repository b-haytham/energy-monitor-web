import Link from '@components/Link';
import { useDisclosure } from '@mantine/hooks';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { login } from '@redux/auth/actions';
import { fetchAll } from '@redux/global/actions';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import socket from 'src/socket';

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
        if(user.role.includes('admin')) throw new Error("Login page for users")

        dispatch(fetchAll(user))
        .unwrap()
        .then(() => {
          socket.emit('authenticate', { access_token })
          router.push('/dash');
        })
      })
      .catch(err => {
        enqueueSnackbar(err.message || "Something Wen't Wrong!", { variant: 'error' });
        console.error(err);
      });
  }

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={12} md={4}  sx={{ p: { xs: 3, sm: 10 ,md: 10 } }}  alignSelf={'center'}>
        <Box sx={{ my: 'auto' }}>
          <Typography variant="h3" component="h1">Login To Energy Monitor</Typography>
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
                  <Link href={"/auth/forgot-password"}>
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
        md={8} 
        sx={{ 
          bgcolor: (theme) => theme.palette.grey[50]
        }}
      >
        <Box 
          sx={{ 
            display: { xs: 'none', sm: 'none', md: 'flex' }, 
            height: 1, 
            // display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
        >
          {/*<Image src='/logo.svg' alt="logo" width={500} height={500} /> */}
          <img src='/logo.svg' alt="logo" width="61%" /> 
        </Box>
      </Grid>
    </Grid>
  )
}

export default Login;
