import { Device } from "@api/types/device";
import { DeviceNotification } from "@api/types/device-notification";
import { Value } from "@api/types/value";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createDevice, deleteDevice, getDevices, updateDevice } from "./actions";

// Define a type for the slice state
interface InitialState {
  devices: Device[];
  loading: boolean;
  errors: string[];
}

// Define the initial state using that type
const initialState: InitialState = {
  devices: [],
  loading: false,
  errors: [],
};

const devicesSlice = createSlice({
  name: "devices",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    deviceHandleNotification: (state, action: PayloadAction<DeviceNotification>) => {
      const device = state.devices.find(dev => dev._id == action.payload.d);
      if(device) {
        device.power = action.payload.p['p']; 
        device.energie = action.payload.p['e']; 

        const newValues = (device.values as Value[]).map(val => {
          if(val.accessor in action.payload.p) { 
            return { ...val, latest_value: { value: action.payload.p[val.accessor], timestamp: action.payload.t } }
          } else {
            return val;
          }
        })
        device.values = newValues;  
      }
    },

    setDevices: (state, action: PayloadAction<Device[]>) => {
      state.devices = action.payload
    },
    
    deleteDevices: (state, action: PayloadAction<string[]>) => {
      state.devices = state.devices.filter((device) => !action.payload.includes(device._id));
    },

    
    deleteDevice: (state, action: PayloadAction<string>) => {
      state.devices = state.devices.filter((device) => device._id !== action.payload);
    },

    devicesCrearErrors: (state) => {
      state.errors = [];
    },

    devicesClearState: (state) => {
      state.loading = false;
      state.devices = [];
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createDevice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createDevice.fulfilled, (state, action) => {
      state.loading = false;
      state.devices.push(action.payload);
    });
    builder.addCase(createDevice.rejected, (state, action) => {
      state.loading = false;
      const errors = action.payload || [];
      state.errors = [...state.errors, ...errors];
    });

    builder.addCase(updateDevice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateDevice.fulfilled, (state, action) => {
      state.loading = false;
      state.devices = state.devices.map((dev) =>
        dev._id == action.payload._id ? action.payload : dev
      );
    });
    builder.addCase(updateDevice.rejected, (state, action) => {
      state.loading = false;
      const errors = action.payload || [];
      state.errors = [...state.errors, ...errors];
    });

    builder.addCase(getDevices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDevices.fulfilled, (state, action) => {
      state.loading = false;
      state.devices = action.payload;
    });
    builder.addCase(getDevices.rejected, (state, action) => {
      state.loading = false;
      const errors = action.payload || [];
      state.errors = [...state.errors, ...errors];
    });

    builder.addCase(deleteDevice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteDevice.fulfilled, (state, action) => {
      state.loading = false;
      state.devices = state.devices.filter(device => device._id !== action.payload._id)
    });
    builder.addCase(deleteDevice.rejected, (state, action) => {
      state.loading = false;
      const errors = action.payload || [];
      state.errors = [...state.errors, ...errors];
    });
  },
});

export const {
  devicesClearState,
  devicesCrearErrors,
  setDevices,
  deviceHandleNotification,
  deleteDevices,
} = devicesSlice.actions;

export default devicesSlice.reducer;
