import { createAsyncThunk } from "@reduxjs/toolkit";

import { Device } from "@api/types/device";
import { CreateRequest, QueryDeviceOptions, UpdateRequest } from "@api/devices";

import api from "@api";
import { subscriptionAddDevice, subscriptionDeleteDevice } from "@redux/subscriptions/subscriptionsSlice";
import { Subscription } from "@api/types/subscription";

export const createDevice = createAsyncThunk<
  Device,
  CreateRequest,
  { rejectValue: string[] }
>("devices/create", async (params, thunkApi) => {
  try {
    const data: Device = await api.devices.create(params);
    
    thunkApi.dispatch(subscriptionAddDevice({ 
      device: data._id, 
      subscription: (data.subscription as Subscription)._id  
    }))
    return data;
  } catch (error: any) {
    const messages: string[] = error.errors;
    return thunkApi.rejectWithValue(messages);
  }
});

export const updateDevice = createAsyncThunk<
  Device,
  UpdateRequest & { _id: string },
  { rejectValue: string[] }
>("devices/update", async (params, thunkApi) => {
  try {
    const data = await api.devices.update(params._id, params);
    return data as Device;
  } catch (error: any) {
    const messages: string[] = error.errors;
    return thunkApi.rejectWithValue(messages);
  }
});

export const getDevices = createAsyncThunk<
  Device[],
  QueryDeviceOptions,
  { rejectValue: string[] }
>("devices/find", async (params = {}, thunkApi) => {
  try {
    const data = await api.devices.find(params);
    return data as Device[];
  } catch (error: any) {
    const messages: string[] = error.errors;
    return thunkApi.rejectWithValue(messages);
  }
});

export const getDevice = createAsyncThunk<
  Device,
  string,
  { rejectValue: string[] }
>("devices/get", async (id, thunkApi) => {
  try {
    const data = await api.devices.get(id);
    return data as Device;
  } catch (error: any) {
    const messages: string[] = error.errors;
    return thunkApi.rejectWithValue(messages);
  }
});

export const deleteDevice = createAsyncThunk<
  Device,
  string,
  { rejectValue: string[] }
>("devices/remove", async (id, thunkApi) => {
  try {
    const data: Device = await api.devices.remove(id);
    thunkApi.dispatch(subscriptionDeleteDevice({ 
      device: data._id, 
      subscription: (data.subscription as Subscription)._id 
    }));
    return data;
  } catch (error: any) {
    const messages: string[] = error.errors;
    return thunkApi.rejectWithValue(messages);
  }
});
