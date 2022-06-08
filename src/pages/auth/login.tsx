import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { login } from '@redux/auth/actions';
import { fetchAll } from '@redux/global/actions';
import { useAppDispatch } from '@redux/store';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

interface LoginProps {}

const Login = ({}: LoginProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (data: any) => {
    dispatch(login(data))
      .unwrap()
      .then(({ user }) => {
        dispatch(fetchAll(user))
        .unwrap()
        .then(() => {
          router.push('/dash');
        })
      });
  }

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid item xs={12} md={4}  sx={{ p: 3 }}>
        <Typography variant="h2">Login</Typography>

        <Box sx={{ mt: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField 
              id="email" 
              fullWidth 
              label="Email"
              size='small'
              sx={{ mb: 2 }}
              {...register('email')}
            />
            <TextField 
              id="password" 
              fullWidth 
              label="Password" 
              type="password" 
              size='small'
              sx={{ mb: 2 }}
              {...register('password')}  
            />
            <Button 
              type='submit' 
              size="large"
              variant="contained"
              fullWidth
              sx={{ boxShadow: "none" }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
      </Grid>
    </Grid>
  )
}

export default Login;
