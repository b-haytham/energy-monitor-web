import { RegisterRequest } from "@api/auth";
import { User } from "@api/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "@api";
import { addUser } from "@redux/subscriptions/subscriptionsSlice";
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
