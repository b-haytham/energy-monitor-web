import { Subscription } from "@api/types/subscription";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createSubscription,
  getSubscriptions,
  updateSubscription,
} from "./actions";

// Define a type for the slice state
interface InitialState {
  subscriptions: Subscription[];
  loading: boolean;
  errors: string[];
}

// Define the initial state using that type
const initialState: InitialState = {
  subscriptions: [],
  loading: false,
  errors: [],
};

const subscriptionsSlice = createSlice({
  name: "subscriptions",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSubscriptions: (state, action: PayloadAction<Subscription[]>) => {
      state.subscriptions = action.payload
    },

    subscriptionsClearErrors: (state) => {
      state.errors = [];
    },

    subscriptionsClearState: (state) => {
      state.errors = [];
      state.loading = false;
      state.subscriptions = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createSubscription.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createSubscription.fulfilled, (state, action) => {
      state.loading = false;
      state.subscriptions.push(action.payload);
    });
    builder.addCase(createSubscription.rejected, (state, action) => {
      state.loading = false;
      const errors = action.payload || [];
      state.errors = [...state.errors, ...errors];
    });

    builder.addCase(updateSubscription.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSubscription.fulfilled, (state, action) => {
      state.loading = false;
      state.subscriptions = state.subscriptions.map((sub) =>
        sub._id == action.payload._id ? action.payload : sub
      );
    });
    builder.addCase(updateSubscription.rejected, (state, action) => {
      state.loading = false;
      const errors = action.payload || [];
      state.errors = [...state.errors, ...errors];
    });

    builder.addCase(getSubscriptions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSubscriptions.fulfilled, (state, action) => {
      state.loading = false;
      state.subscriptions = action.payload;
    });
    builder.addCase(getSubscriptions.rejected, (state, action) => {
      state.loading = false;
      const errors = action.payload || [];
      state.errors = [...state.errors, ...errors];
    });
  },
});

export const { 
  subscriptionsClearErrors, 
  subscriptionsClearState, 
  setSubscriptions,
} = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;
