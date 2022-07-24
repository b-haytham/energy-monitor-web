import { Subscription } from "@api/types/subscription";
import { User } from "@api/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { changePassword, login, logout, updateUserInfo } from "./actions";

// Define a type for the slice state
interface InitialState {
  access_token: string | null;
  user: User | null;
  loading: boolean;
  errors: string[];
}

// Define the initial state using that type
const initialState: InitialState = {
  access_token: null,
  user: null,
  loading: false,
  errors: [],
};

const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateLoggedInUser(state, action: PayloadAction<User>) {
      if(state.user && state.user._id == action.payload._id) {
        state.user.first_name = action.payload.first_name;
        state.user.last_name = action.payload.last_name;
      }
    },
    updateLoggedInUserSubscriptionCompanyInfo(state, action: PayloadAction<Subscription["company_info"]>) {
      if(state.user) {
        (state.user.subscription as Subscription).company_info = action.payload;
      }
    },

    authClearErrors: (state) => {
      state.errors = [];
    },
    authClearState: (state) => {
      state.access_token = null;
      state.user = null;
      state.loading = false;
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
      state.errors = []
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      //@ts-ignore
      state.errors = action.payload || [];
    });

    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.access_token = null;
    });
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
      state.errors = [];
    });

    builder.addCase(updateUserInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      if (state.user) {
        state.user = action.payload
      } 
    });
    builder.addCase(updateUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.errors = [];
    });
  },
});

export const { 
  authClearErrors, 
  authClearState, 
  updateLoggedInUser,
  updateLoggedInUserSubscriptionCompanyInfo,
} = authSlice.actions;

export default authSlice.reducer;
