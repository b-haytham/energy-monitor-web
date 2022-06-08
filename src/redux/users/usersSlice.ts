import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "@api/types/user";
import { createUser } from "./actions";

// Define a type for the slice state
interface InitialState {
  users: User[];
  loading: boolean;
  errors: string[];
}

// Define the initial state using that type
const initialState: InitialState = {
  users: [],
  loading: false,
  errors: [],
};

const usersSlice = createSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserSubscription: (state, action: PayloadAction<{ user: string; subscription: string }>) => {
      const user = state.users.find((u) => u._id == action.payload.user);
      if (user) {
        user.subscription = action.payload.subscription;
      }
    },

    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },

    usersClearErrors: (state) => {
      state.errors = [];
    },

    usersClearState: (state) => {
      state.errors = [];
      state.loading = false;
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      const errors = action.payload || [];
      state.errors = [...state.errors, ...errors];
    });
  },
});

export const {
  usersClearErrors,
  usersClearState,
  setUsers,
  setUserSubscription,
} = usersSlice.actions;

export default usersSlice.reducer;
