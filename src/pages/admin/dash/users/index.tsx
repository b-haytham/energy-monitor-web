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
import { useUsers } from 'src/hooks/useUsers';
import { useState } from 'react';

interface UsersProps {
  users: User[]
}

const Users: NextPage<UsersProps> = ({ users: serverUsers }) => {
  const router = useRouter();
  const { users, handlers } = useUsers(serverUsers);
  const [createUserOpen, createUserHandlers] = useDisclosure(false);

  const [userToUpdate, setUserToUpdate] = useState<User | null>(null)

  return (
    <Box>
      <UserFormDialog 
        open={createUserOpen}
        onClose={createUserHandlers.close}
        onSubmit={async (data) => {
          try {
            await handlers.create(data);
            createUserHandlers.close();
          } catch (error) {
            console.error(error);
          }
        }}
      />
      
      {userToUpdate && <UserFormDialog 
        open={true}
        onClose={() => setUserToUpdate(null)}
        initialValues={userToUpdate}
        onSubmit={(values) => {
          console.log(values);
        }}
      />}
      
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
        <UsersTable 
          users={users} 
          onView={(id) => {
            console.log(id);
          }}
          onEdit={(id) => {
            const user = users.find(user => user._id == id);
            setUserToUpdate(user || null);
          }}
          onDelete={(id) => {
            console.log(id);
          }}
        />
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
