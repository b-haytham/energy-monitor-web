import { User } from "@api/types/user";
import { useAppDispatch } from "@redux/store";
import { createUser, deleteUser, updateUser } from "@redux/users/actions";
import { useState } from "react";

export const useUsers = (initialUsers: User[]) => {
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState(initialUsers);

  const create = async (data: any) => {
    try {
      const user = await dispatch(createUser(data)).unwrap();
      setUsers((prev) => [user, ...prev]);
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const remove = async (id: string) => {
    try {
      const user = await dispatch(deleteUser(id)).unwrap();
      setUsers((prev) => prev.filter(u => u._id !== user._id ));
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const update = async (data: any) => {
    try {
      const user = await dispatch(updateUser(data)).unwrap();
      setUsers((prev) => prev.map(u => u._id == user._id ? user : u))
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const handlers = {
    create,
    remove,
    update,
  }

  return { users, handlers };
}

