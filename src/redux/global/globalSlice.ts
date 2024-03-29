import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export enum AppNotificationType {
  TriggeredAlert = "Triggered Alert",
  ReportGenerated = "Report Generated",
  DeviceConnectAttempt = "Device Connection Attempt",
  DeviceConnectionLost = "Device Connection Lost",
  DeviceDisconnected = "Device Disconnected",
  DeviceAuthenticated = "Device Authenticated",
  DeviceAuthenticationFailed = "Device Failed to Authenticate"
}

export type AppNotification = {
  id: string,
  data: Record<string, any> & { type: AppNotificationType },
  read: boolean
}

type InitialState = {
  loading: boolean;
  notifications: AppNotification[];
}

const initialState: InitialState = {
  loading: false,
  notifications: [],
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    addAppNotification(state, action: PayloadAction<AppNotification['data']>) {
      state.notifications.push({ id: uuidv4(), data: action.payload, read: false })
    },
    markReadAppNotification(state, action: PayloadAction<string>) {
      const notification = state.notifications.find(notif => notif.id == action.payload)
      if (notification) {
        notification.read = true
      }
    },
    markReadAllAppNotification(state) {
      state.notifications = state.notifications.map(it => ({...it, read: true}));
    },
    deleteAppNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(notif => notif.id !== action.payload);
    },
    deleteAllAppNotification(state) {
      state.notifications = []
    }
  }
})

export const { 
  setGlobalLoading, 
  addAppNotification,  
  markReadAppNotification,
  deleteAppNotification,
  markReadAllAppNotification,
  deleteAllAppNotification
} = globalSlice.actions;

export default globalSlice.reducer;
