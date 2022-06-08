import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box, Button, Paper } from '@mui/material'
import { useDisclosure } from '@mantine/hooks';

import PageHeader from '@components/PageHeader';
import UsersTable from '@components/tables/UsersTable';
import { UserFormDialog } from '@components/forms/UserForm';

import api from '@api';
import { User } from '@api/types/user';
import { handleServerSidePropsRejection } from '@utils/errors';

interface UsersProps {
  users: User[]
}

const Users: NextPage<UsersProps> = ({ users }) => {
  const router = useRouter();
  const [createUserOpen, createUserHandlers] = useDisclosure(false);
  return (
    <Box>
      <UserFormDialog 
        open={createUserOpen}
        onClose={createUserHandlers.close}
        onSubmit={async (_) => {}}
      />
      <PageHeader
        title="Users" 
        onBack={() => router.back()} 
        right={
          <Button
            color="primary"
            variant="outlined"
            onClick={createUserHandlers.open}
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
