import { RegisterRequest } from "@api/auth";
import { Role, User } from "@api/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "@api";
import { addUser, subscriptionDeleteUser } from "@redux/subscriptions/subscriptionsSlice";
import { Subscription } from "@api/types/subscription";

export const createUser = createAsyncThunk<
  User,
  RegisterRequest,
  { rejectValue: string[] }
>("auth/register", async (registerRequest, thunkApi) => {
  try {
    const data: User = await api.auth.register(registerRequest);
    if (data.role == 'user') {
      thunkApi.dispatch(addUser({ id: (data.subscription as Subscription)._id, user: data }))
    }
    return data;
  } catch (error: any) {
    const messages: string[] = error.errors;
    return thunkApi.rejectWithValue(messages);
  }
});

export const deleteUser = createAsyncThunk<
  User,
  string,
  { rejectValue: string[] }
>("users/remove", async (userId, thunkApi) => {
  try {
    const data: User = await api.users.remove(userId);
    if (data.role == Role.USER) {
      thunkApi.dispatch(subscriptionDeleteUser({ 
        user: data._id, 
        subscription: (data.subscription as Subscription)._id 
      }))
    }
    return data;
  } catch (error: any) {
    const messages: string[] = error.errors;
    return thunkApi.rejectWithValue(messages);
  }
});
