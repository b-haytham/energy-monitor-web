import api from "@api";
import { CreateAlertDto, UpdateAlertDto } from "@api/alerts";
import { Alert } from "@api/types/alert";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createAlert = createAsyncThunk<
  Alert,
  CreateAlertDto,
  { rejectValue: string[] }
>("alerts/create", async (params, thunkApi) => {
  try {
    const data: Alert = await api.alerts.create(params);

    return data;
  } catch (error: any) {
    const messages: string[] = error.errors;
    return thunkApi.rejectWithValue(messages);
  }
});

export const getAlerts = createAsyncThunk<
  Alert[],
  {},
  { rejectValue: string[] }
>("alerts/find", async (params = {}, thunkApi) => {
  try {
    const data = await api.alerts.find(params);
    return data as Alert[];
  } catch (error: any) {
    const messages: string[] = error.errors;
    return thunkApi.rejectWithValue(messages);
  }
});

export const updateAlert = createAsyncThunk<
  Alert,
  UpdateAlertDto & {_id: string},
  { rejectValue: string[] }
>("alerts/update", async (params, thunkApi) => {
  try {
    const data: Alert = await api.alerts.update(params._id , params);

    return data;
  } catch (error: any) {
    const messages: string[] = error.errors;
    return thunkApi.rejectWithValue(messages);
  }
});

export const deleteAlert = createAsyncThunk<
  Alert,
  string,
  { rejectValue: string[] }
>("alerts/remove", async (alertId, thunkApi) => {
  try {
    const data: Alert = await api.alerts.remove(alertId);

    return data;
  } catch (error: any) {
    const messages: string[] = error.errors;
    return thunkApi.rejectWithValue(messages);
  }
});
