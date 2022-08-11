import { useState } from "react";

import { useAppDispatch } from "@redux/store";
import { createDevice as storeCreateDevice } from '@redux/devices/actions';
import { createUser as storeCreateUser } from '@redux/users/actions';
import { updateSubscription as storeUpdateSubscription } from '@redux/subscriptions/actions';

import { Subscription } from "@api/types/subscription";
import { User } from "@api/types/user";
import { Device } from "@api/types/device";

export const useSubscriptionDetails = (initialSubscription: Subscription) => {
  const dispatch = useAppDispatch() 
  const [subscription, setSubscription] = useState(initialSubscription);
  const [admin, setAdmin] = useState(subscription.admin as User);
  const [users, setUsers] = useState(subscription.users as User[])
  const [devices, setDevices] = useState(subscription.devices as Device[]);

  const createDevice = async (data: any) => {
    try {
      let device = await dispatch(storeCreateDevice(data)).unwrap();
        
    
      setSubscription((prev) => ({
        ...prev,
        devices: [{...device, subscription: subscription._id } as Device, ...prev.devices]
      } as Subscription))
  
      setDevices((prev) => [{...device, subscription: subscription._id }, ...prev])

      return device;
    } catch (error) {
      throw error;
    }
  }

  const createUser = async (data: any) => {
    try {
      const user = await dispatch(storeCreateUser(data)).unwrap();
    
      setSubscription((prev) => ({
        ...prev,
        users: [user, ...prev.users]
      } as Subscription))
  
      setUsers((prev) => [user, ...prev])

      return user;
    } catch (error) {
      throw error;
    }
  }

  const updateSubscription = async (data: any) => {
    try {
      const subscription = await dispatch(storeUpdateSubscription(data)).unwrap();
    
      setSubscription((prev) => ({
        ...subscription,
        users,
        devices
      } as Subscription))
  

      return subscription;
    } catch (error) {
      throw error;
    }
  }

  const handlers = {
    createDevice,
    createUser,
    updateSubscription,
  }

  return { subscription, admin, users, devices, handlers };
}
