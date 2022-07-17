import { devicesClearState } from "@redux/devices/devicesSlice";
import { subscriptionsClearState } from "@redux/subscriptions/subscriptionsSlice";
import { updateUserName, usersClearState } from "@redux/users/usersSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";


import api from "src/api";

import { User } from "@api/types/user";
import { alertsClearState } from "@redux/alerts/alertsSlice";
import { reportsClearState } from "@redux/reports/reportsSlice";
import { UpdateUserInfoDto } from "@api/users";
import { updateLoggedInUser } from "./authSlice";

export const login = createAsyncThunk<
  { access_token: string; user: User },
  { email: string; password: string },
  { rejectValue: string[] }
>("auth/login", async ({ email, password }, thunkApi) => {
  try {
    const data: { access_token: string; user: User } = await api.auth.login({
      email,
      password,
    });
    return data;
  } catch (error: any) {
    const messages: string[] = error.errors;
    return thunkApi.rejectWithValue(messages);
  }
}); 

export const updateUserInfo = createAsyncThunk<
  User,
  UpdateUserInfoDto & { _id: string },
  { rejectValue: string[] }
>("auth/updateUser", async (params, thunkApi) => {
  try {
    const data: User = await api.users.updateInfo(params._id, params);
    thunkApi.dispatch(updateUserName(data));        
    thunkApi.dispatch(updateLoggedInUser(data));        
    return data;
  } catch (error: any) {
    const messages: string[] = error.errors;
    return thunkApi.rejectWithValue(messages);
  }
}); 

export const logout = createAsyncThunk<{}, {}, { rejectValue: string[] }>(
  "auth/logout",
  async ({}, thunkApi) => {
    try {
      const data: {} = await api.auth.logout();
      thunkApi.dispatch(subscriptionsClearState());
      thunkApi.dispatch(devicesClearState());
      thunkApi.dispatch(usersClearState());
      thunkApi.dispatch(alertsClearState());
      thunkApi.dispatch(reportsClearState());
      return data;
    } catch (error: any) {
      const messages: string[] = error.errors;
      return thunkApi.rejectWithValue(messages);
    }
  }
);

