import { RegisterRequest } from "@api/auth";
import { User } from "@api/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "@api";

export const createUser = createAsyncThunk<
  User,
  RegisterRequest,
  { rejectValue: string[] }
>("auth/register", async (registerRequest, thunkApi) => {
  try {
    const data: User = await api.auth.register(registerRequest);
    return data;
  } catch (error: any) {
    const messages: string[] = error.errors;
    return thunkApi.rejectWithValue(messages);
  }
});
