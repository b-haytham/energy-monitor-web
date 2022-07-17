import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box, IconButton, Paper } from '@mui/material'

import PageHeader from '@components/PageHeader';
import UsersTable from '@components/tables/UsersTable';

import api from '@api';
import { User } from '@api/types/user';
import { handleServerSidePropsRejection } from '@utils/errors';
import { useSnackbar } from 'notistack';
import { useUsers } from 'src/hooks/useUsers';
import { useDisclosure } from '@mantine/hooks';
import { AddOutlined } from '@mui/icons-material';
import ConfirmDelete from '@components/forms/ConfirmDelete';
import { UserFormDialog } from '@components/forms/UserForm';
import { useState } from 'react';

interface UsersProps {
  users: User[]
}

const Users: NextPage<UsersProps> = ({ users: serverUsers }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { users, handlers } = useUsers(serverUsers);
  const [createUserOpen, createUserHandlers] = useDisclosure(false);

  const [userToUpdate, setUserToUpdate] = useState<User | null>(null)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  return (
    <Box sx={{  height: 1, display: 'flex', flexDirection: 'column' }}>
      {userToDelete && (
        <ConfirmDelete 
          title="Delete User"
          content={`You're about to delete a user, this action is destrucive`}
          open={Boolean(userToDelete)}
          onClose={() => setUserToDelete(null)}
          onSubmit={async () => {
            try {
              const user = await handlers.remove(userToDelete._id);
              console.log('DELETED USER >>', user);
              setUserToDelete(null);
              enqueueSnackbar("User successfully deleted.", { variant: 'success' })
            } catch (error) {
              console.error(error);
              enqueueSnackbar("Failed to delete user.", { variant: 'error' })
            }
          }}
        />
      )} 
      <UserFormDialog 
        open={createUserOpen}
        onClose={createUserHandlers.close}
        onSubmit={async (data) => {
          try {
            await handlers.create(data);
            createUserHandlers.close();
            enqueueSnackbar("User successfully created.", { variant: 'success' })
          } catch (error) {
            console.error(error);
            enqueueSnackbar("Failed to create user.", { variant: 'error' })
          }
        }}
      />
      
      {userToUpdate && <UserFormDialog 
        open={true}
        onClose={() => setUserToUpdate(null)}
        initialValues={userToUpdate}
        onSubmit={async (values) => {
          console.log(values);
          try {
            const user = await handlers.update({ ...values, _id: userToUpdate._id });
            enqueueSnackbar("User successfully updated.", { variant: 'success' })
            setUserToUpdate(null);
            console.log(user);
          } catch (error) {
            console.error(error);
            enqueueSnackbar((error as any).message, { variant: 'error' });
          }
        }}
      />}
      

      <PageHeader
        title='Users'
        onBack={() => router.back()}
        right={
          <IconButton size="small" onClick={createUserHandlers.open}>
            <AddOutlined />
          </IconButton>
        }
      />
      <Paper
        variant="outlined"
        sx={{ my: 2, border: 'none', flex: 1 }}
      >
        <UsersTable 
          users={users} 
          onView={(id) => {
            console.log(id);
          }}
          onEdit={(id) => {
            const user = users.find(u => u._id == id);
            setUserToUpdate(user || null);
          }}
          onDelete={(id) => {
            const user = users.find(u => u._id == id);
            setUserToDelete(user || null);
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
  } catch (error) {
    return handleServerSidePropsRejection(error);
  }
  return {
    props: {
      users    
    }
  }
}

export default Users;
