import { Device } from "@api/types/device";
import { DeviceNotification } from "@api/types/device-notification";
import { Subscription } from "@api/types/subscription";
import { Value } from "@api/types/value";
import { useState } from "react";

export const useDeviceDetails = (initialDevice: Device) => {
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


  const handlers = {
    handleNotification,
  }

  return { device, subscription, values, handlers };
}
