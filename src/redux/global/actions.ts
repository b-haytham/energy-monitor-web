import api from "@api";
import { User } from "@api/types/user";
import { setAlerts } from "@redux/alerts/alertsSlice";
import { setDevices } from "@redux/devices/devicesSlice";
import { setReports } from "@redux/reports/reportsSlice";
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
        reports,
        alerts,
      ] = await Promise.all([
        api.subscriptions.find({ params: { p: 'admin' } }),
        api.devices.find({ params: { p: 'subscription' } }),
        api.users.find({}),
        api.reports.find(),
        api.alerts.find({}),
      ]);

      console.log('SUBSCRIPTIONS >> ', subscriptions);
      console.log('DEVICES >> ', devices);
      console.log('USERS >> ', users);
      console.log('REPORTS >> ', reports);
      console.log('ALERTS >> ', alerts);

      thunkApi.dispatch(setSubscriptions(subscriptions));
      thunkApi.dispatch(setDevices(devices));
      thunkApi.dispatch(setUsers(users));
      thunkApi.dispatch(setReports(reports));
      thunkApi.dispatch(setAlerts(alerts));

    } else {
      const [
        devices,
        users,
        reports,
        alerts
      ] = await Promise.all([
        api.devices.find({ params: { p: 'subscription' } }),
        api.users.find({ }),
        api.reports.find(),
        api.alerts.find({}),
      ]);

      console.log('DEVICES >> ', devices);
      console.log('USERS >> ', users);
      console.log('REPORTS >> ', reports);
      console.log('ALERTS >> ', alerts);

      thunkApi.dispatch(setDevices(devices));
      thunkApi.dispatch(setUsers(users));
      thunkApi.dispatch(setReports(reports));
      thunkApi.dispatch(setAlerts(alerts));
    }

    thunkApi.dispatch(setGlobalLoading(false));
  } catch (error: any) {
    console.log(error);
    const messages: string[] = error.errors;
    thunkApi.dispatch(setGlobalLoading(false));
    return thunkApi.rejectWithValue(messages);
  }
});
