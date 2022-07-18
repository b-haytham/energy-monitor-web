import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export enum AppNotificationType {
  TriggeredAlert = "Triggered Alert",
  ReportGenerated = "Report Generated"
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
    deleteAppNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(notif => notif.id !== action.payload);
    }
  }
})

export const { 
  setGlobalLoading, 
  addAppNotification,  
  markReadAppNotification,
  deleteAppNotification,
} = globalSlice.actions;

export default globalSlice.reducer;
