import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box, Button, Paper } from '@mui/material'

import PageHeader from '@components/PageHeader';
import UsersTable from '@components/tables/UsersTable';

import { User } from '@api/types/user';
import { handleServerSidePropsRejection } from '@utils/errors';
import api from '@api';

interface UsersProps {
  users: User[]
}

const Users: NextPage<UsersProps> = ({ users }) => {
  const router = useRouter();
  return (
    <Box>
      <PageHeader
        title="Users" 
        onBack={() => router.back()} 
        right={
          <Button
            color="primary"
            variant="outlined"
          >
            Add User
          </Button>
        }
      />
      <Paper
        variant="outlined"
        sx={{ mt: 2, border: 'none', height: 500 }}
      >
        <UsersTable users={users} />
      </Paper>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  console.log(req.url);
  
  let users: User[];
  try {
    users = await api.users.find({ headers: req.headers, params: { p: "subscription" } })
    console.log("Server ", users)
  } catch (error) {
    return handleServerSidePropsRejection(error);  
  }

  return {
    props: {
      users,
    },
  }
}

export default Users;
