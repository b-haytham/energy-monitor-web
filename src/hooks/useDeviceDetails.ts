import { useState } from "react";

import { useAppDispatch } from "@redux/store";
import { updateDevice as storeUpdateDevice } from '@redux/devices/actions';

import { Device } from "@api/types/device";
import { DeviceNotification } from "@api/types/device-notification";
import { Subscription } from "@api/types/subscription";
import { Value } from "@api/types/value";

export const useDeviceDetails = (initialDevice: Device) => {
  const dispatch = useAppDispatch();
  const [device, setDevice] = useState(initialDevice);
  const [subscription, setSubscription] = useState(device.subscription as Subscription)
  const [values, setValues] = useState(device.values as Value[])

  
  const handleNotification = (data: DeviceNotification) => {
    const newValues = values.map((val) => {
      if (val.accessor in data.p) {
        return {...val, latest_value: { value: data.p[val.accessor] , timestamp: data.t  }};
      }else {
        return val;
      }
    })

    setDevice((prev) => ({...prev, values: newValues, energie: data.p["e"], power: data.p["p"] }))
    setValues((_) => newValues);
  }

  const updateDevice = async (data: any) => {
    try {
      const device = await dispatch(storeUpdateDevice(data)).unwrap();
      setDevice((prev) => ({
        ...device
      }))
      return device;
    } catch (error) {
      throw error;
    }
  }

  const handlers = {
    handleNotification,
    updateDevice,
  }

  return { device, subscription, values, handlers };
}
