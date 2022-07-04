import { Subscription } from "@api/types/subscription";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateRequest, UpdateRequest } from "@api/subscriptions";
import { deleteUsers, setUserSubscription } from "@redux/users/usersSlice";

import api from "@api";
import { Device } from "@api/types/device";
import { User } from "@api/types/user";
import { deleteDevices } from "@redux/devices/devicesSlice";

export const createSubscription = createAsyncThunk<
  Subscription,
  CreateRequest,
  { rejectValue: string[] }
>("subscriptions/create", async (params, thunkApi) => {
  try {
    const data: Subscription = await api.subscriptions.create(params);
    thunkApi.dispatch(setUserSubscription({
      user: typeof data.admin == 'string' ? data.admin : data.admin._id,
      subscription: data._id
    }));
    return data;
  } catch (error: any) {
    const messages: string[] = error.errors;
    return thunkApi.rejectWithValue(messages);
  }
});

export const updateSubscription = createAsyncThunk<
  Subscription,
  UpdateRequest & { _id: string },
  { rejectValue: string[] }
>("subscriptions/update", async (params, thunkApi) => {
  try {
    const data = await api.subscriptions.update(params._id, params);
    return data as Subscription;
  } catch (error: any) {
    const messages: string[] = error.errors;
    return thunkApi.rejectWithValue(messages);
  }
});

export const getSubscriptions = createAsyncThunk<
  Subscription[],
  {},
  { rejectValue: string[] }
>("subscriptions/find", async (params = {}, thunkApi) => {
  try {
    const data = await api.subscriptions.find({ params: { p: "admin" } });
    return data as Subscription[];
  } catch (error: any) {
    const messages: string[] = error.errors;
    return thunkApi.rejectWithValue(messages);
  }
});

export const getSubscription = createAsyncThunk<
  Subscription,
  string,
  { rejectValue: string[] }
>("subscriptions/get", async (id, thunkApi) => {
  try {
    const data = await api.subscriptions.get(id);
    return data as Subscription;
  } catch (error: any) {
    const messages: string[] = error.errors;
    return thunkApi.rejectWithValue(messages);
  }
});

export const deleteSubscription = createAsyncThunk<
  Subscription,
  string,
  { rejectValue: string[] }
>("subscriptions/remove", async (id, thunkApi) => {
  try {
    const data: Subscription = await api.subscriptions.remove(id);
    const devices = (data.devices as Device[]).map(dev => dev._id);
    const users = [
      (data.admin as User)._id,
      ...(data.users as User[]).map(u => u._id)
    ]
    
    thunkApi.dispatch(deleteDevices(devices));
    thunkApi.dispatch(deleteUsers(users));

    return data;
  } catch (error: any) {
    const messages: string[] = error.errors;
    return thunkApi.rejectWithValue(messages);
  }
});
