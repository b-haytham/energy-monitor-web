import { User } from "@api/types/user";
import { useAppDispatch } from "@redux/store";
import { createUser } from "@redux/users/actions";
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

  const handlers = {
    create,
  }

  return { users, handlers };
}

