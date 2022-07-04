
import { Alert } from "@api/types/alert";
import { TriggeredAlert } from "@api/types/triggered-alert";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAlert, deleteAlert, getAlerts, updateAlert } from "./actions";


type InitialState = {
  loading: boolean;
  errors: string[];
  alerts: Alert[];
  triggeredAlerts: TriggeredAlert[]
}

const initialState: InitialState = {
  loading: false,
  errors: [],
  alerts: [],
  triggeredAlerts: [],
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setAlerts: (state, action: PayloadAction<Alert[]>) => {
      state.alerts = action.payload;
    },

    setTriggeredAlert: (state, action: PayloadAction<TriggeredAlert[]>) => {
      state.triggeredAlerts = action.payload;
    },

    addTriggeredAlert: (state, action: PayloadAction<TriggeredAlert>) => {
      state.triggeredAlerts.push(action.payload);
    },

    alertsCrearErrors: (state) => {
      state.errors = [];
    },

    alertsClearState: (state) => {
      state.loading = false;
      state.triggeredAlerts = [];
      state.alerts = [];
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAlert.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAlert.fulfilled, (state, action) => {
      state.loading = false;
      state.alerts.push(action.payload);
    });
    builder.addCase(createAlert.rejected, (state, action) => {
      state.loading = false;
      const errors = action.payload || [];
      state.errors = [...state.errors, ...errors];
    });

    builder.addCase(updateAlert.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAlert.fulfilled, (state, action) => {
      state.loading = false;
      state.alerts = state.alerts.map((alert) =>
        alert._id == action.payload._id ? action.payload : alert
      );
    });
    builder.addCase(updateAlert.rejected, (state, action) => {
      state.loading = false;
      const errors = action.payload || [];
      state.errors = [...state.errors, ...errors];
    });

    builder.addCase(getAlerts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAlerts.fulfilled, (state, action) => {
      state.loading = false;
      state.alerts = action.payload;
    });
    builder.addCase(getAlerts.rejected, (state, action) => {
      state.loading = false;
      const errors = action.payload || [];
      state.errors = [...state.errors, ...errors];
    });

    builder.addCase(deleteAlert.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAlert.fulfilled, (state, action) => {
      state.loading = false;
      state.alerts = state.alerts.filter(alert => alert._id !== action.payload._id)
    });
    builder.addCase(deleteAlert.rejected, (state, action) => {
      state.loading = false;
      const errors = action.payload || [];
      state.errors = [...state.errors, ...errors];
    });
  }
});

export const {
  setAlerts,
  setTriggeredAlert,
  addTriggeredAlert,
  alertsClearState,
  alertsCrearErrors,
} = alertsSlice.actions;

export default alertsSlice.reducer;
