import { combineReducers } from "@reduxjs/toolkit";
import alertsSlice from "./alerts/alertsSlice";

import authSlice from "./auth/authSlice";
import devicesSlice from "./devices/devicesSlice";
import globalSlice from "./global/globalSlice";
import reportsSlice from "./reports/reportsSlice";
import subscriptionsSlice from "./subscriptions/subscriptionsSlice";
import usersSlice from "./users/usersSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  subscriptions: subscriptionsSlice,
  devices: devicesSlice,
  users: usersSlice,
  alerts: alertsSlice,
  reports: reportsSlice,
  global: globalSlice
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
