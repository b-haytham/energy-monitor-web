
import { Report } from "@api/types/reports";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type InitialState = {
  loading: boolean;
  errors: string[];
  reports: Report[];
}

const initialState: InitialState = {
  loading: false,
  errors: [],
  reports: []
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    createReport(state, action: PayloadAction<Report>) {
      state.reports.push(action.payload);
    },

    setReports: (state, action: PayloadAction<Report[]>) => {
      state.reports = action.payload
    },

    reportsCrearErrors: (state) => {
      state.errors = [];
    },

    reportsClearState: (state) => {
      state.loading = false;
      state.reports = [];
      state.errors = [];
    },
  },
})

export const {
  createReport,
  setReports,
  reportsClearState,
  reportsCrearErrors,
} = reportsSlice.actions;

export default reportsSlice.reducer;
