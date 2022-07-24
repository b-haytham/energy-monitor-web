import { Subscription } from "@api/types/subscription";
import { User } from "@api/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createSubscription,
  deleteSubscription,
  getSubscriptions,
  updateSubscription,
  updateSubscriptionInfo,
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

    addUser(state, action: PayloadAction<{id: string; user: User}>) {
      const subscription = state.subscriptions.find(sub =>sub._id == action.payload.id);
      if(subscription) {
        //@ts-ignore
        subscription.users.push({
          ...action.payload.user,
          subscription: (action.payload.user.subscription as Subscription)._id
        });
      }
    },
    
    subscriptionDeleteUser(state, action: PayloadAction<{ user: string, subscription: string }>) {
      const subscription = state.subscriptions
        .find(sub =>sub._id == action.payload.subscription);
      
      if (subscription) {
        subscription.users = (subscription.users as User[])
          .filter(u => u._id !== action.payload.user )
      }
    },

    subscriptionAddDevice(state, action: PayloadAction<{device: string; subscription: string}>) {
      const subscription = state.subscriptions.find(sub =>sub._id == action.payload.subscription);
      if(subscription) {
        (subscription.devices as string[]).push(action.payload.device);
      }
    },

    subscriptionDeleteDevice(state, action: PayloadAction<{ subscription: string; device: string }>) {
      const subscription = state.subscriptions.find(sub =>sub._id == action.payload.subscription);
      if(subscription) {
        subscription.devices = (subscription.devices as string[])
          .filter(device => device !== action.payload.device);
      }
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

    builder.addCase(updateSubscriptionInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSubscriptionInfo.fulfilled, (state, action) => {
      state.loading = false;
      const subscription = state.subscriptions.find(sub => sub._id == action.payload._id);
      if (subscription) {
        subscription.company_info = action.payload.company_info;
      }
    });
    builder.addCase(updateSubscriptionInfo.rejected, (state, action) => {
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

    builder.addCase(deleteSubscription.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSubscription.fulfilled, (state, action) => {
      state.loading = false;
      state.subscriptions = state.subscriptions.
        filter(sub => sub._id !== action.payload._id);
    });
    builder.addCase(deleteSubscription.rejected, (state, action) => {
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
  subscriptionDeleteDevice,
  subscriptionAddDevice,
  addUser,
  subscriptionDeleteUser,
} = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;
