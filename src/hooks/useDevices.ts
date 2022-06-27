import { Device } from "@api/types/device";
import { createDevice, updateDevice } from "@redux/devices/actions";
import { useAppDispatch } from "@redux/store";
import { useState } from "react";

export const useDevices = (initialDevices: Device[]) => {
  const dispatch = useAppDispatch();
  const [devices, setDevices] = useState(initialDevices);

  const create = async (data: any) => {
    try {
      const device = await dispatch(createDevice(data)).unwrap();
      setDevices(prev => [device, ...prev]);
      return device;
    } catch (error) {
      throw error;
    }
  }

  const update = async (data: any) => {
    try {
      const device = await dispatch(updateDevice(data)).unwrap();
      setDevices((prev) => prev.map(dev => dev._id == device._id ? device : dev))
      return device;
    } catch (error) {
      throw error;
    }
  }

  const handlers = {
    create,
    update,
  }

  return { devices, handlers };
}
