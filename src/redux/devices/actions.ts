import { createAsyncThunk } from "@reduxjs/toolkit";

import { Device } from "@api/types/device";
import { CreateRequest, QueryDeviceOptions, UpdateRequest } from "@api/devices";

import api from "@api";
import { RootState } from "@redux/rootReducer";

export const createDevice = createAsyncThunk<
  Device,
  CreateRequest,
  { rejectValue: string[] }
>("devices/create", async (params, thunkApi) => {
  try {
    const data: Device = await api.devices.create(params);
    const state = thunkApi.getState() as RootState;
    
    const subscription = state.subscriptions.subscriptions.find(sub => sub._id == data.subscription);

    if(subscription) {
      data.subscription = subscription;
    }
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
