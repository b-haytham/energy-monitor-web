import api from "@api";
import { User } from "@api/types/user";
import { setDevices } from "@redux/devices/devicesSlice";
import { setSubscriptions } from "@redux/subscriptions/subscriptionsSlice";
import { setUsers } from "@redux/users/usersSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setGlobalLoading } from "./globalSlice";

//@ts-ignore
export const fetchAll = createAsyncThunk<any, User, { rejectWithValue: any }>("global/fetchAll", async (user, thunkApi) => {
  thunkApi.dispatch(setGlobalLoading(true));
  try {
  
    if(user.role.includes("admin")){
      const [
        subscriptions,
        devices,
        users,
      ] = await Promise.all([
        api.subscriptions.find({ params: { p: 'admin' } }),
        api.devices.find({ params: { p: 'subscription' } }),
        api.users.find({ }),
      ]);

      console.log('SUBSCRIPTIONS >> ', subscriptions);
      console.log('DEVICES >> ', devices);
      console.log('USERS >> ', users);

      thunkApi.dispatch(setSubscriptions(subscriptions));
      thunkApi.dispatch(setDevices(devices));
      thunkApi.dispatch(setUsers(users));

    } else {
      const [
        devices,
        users,
      ] = await Promise.all([
        api.devices.find({ params: { p: 'subscription' } }),
        api.users.find({ }),
      ]);

      console.log('DEVICES >> ', devices);
      console.log('USERS >> ', users);

      thunkApi.dispatch(setDevices(devices));
      thunkApi.dispatch(setUsers(users));
    }

    thunkApi.dispatch(setGlobalLoading(false));
  } catch (error: any) {
    console.log(error);
    const messages: string[] = error.errors;
    thunkApi.dispatch(setGlobalLoading(false));
    return thunkApi.rejectWithValue(messages);
  }
});
