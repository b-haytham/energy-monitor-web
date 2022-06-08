import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type InitialState = {
  loading: boolean;
  powerOverview: any[];
  energieOverview: any[];
}

const initialState: InitialState = {
  loading: false,
  powerOverview: [],
  energieOverview: [],
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    }
  }
})

export const { setGlobalLoading } = globalSlice.actions;

export default globalSlice.reducer;
