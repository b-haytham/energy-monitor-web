import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth/authSlice";
import devicesSlice from "./devices/devicesSlice";
import globalSlice from "./global/globalSlice";
import subscriptionsSlice from "./subscriptions/subscriptionsSlice";
import usersSlice from "./users/usersSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  subscriptions: subscriptionsSlice,
  devices: devicesSlice,
  users: usersSlice,
  global: globalSlice
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
