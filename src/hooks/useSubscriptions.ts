import { Subscription } from "@api/types/subscription";
import { useAppDispatch } from "@redux/store";
import { createSubscription, deleteSubscription, updateSubscription } from "@redux/subscriptions/actions";
import { useState } from "react";

export const useSubscriptions = (initialSubscriptions: Subscription[]) => {
  const dispatch = useAppDispatch();
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);

  const create = async (data: any) => {
    try {
      const subscription = await dispatch(createSubscription(data)).unwrap();
      setSubscriptions((prev) => [subscription, ...prev]);
      return subscription;
    } catch (error) {
      throw error;
    }
  }

  const update = async (data: any) => {
    try {
      const subscription = await dispatch(updateSubscription(data)).unwrap();
      setSubscriptions((prev) => prev.map(sub => sub._id == subscription._id ? subscription : sub));
      return subscription;
    } catch (error) {
      throw error;
    }
  }

  const remove = async (id: string) => {
    try {
      const subscription = await dispatch(deleteSubscription(id)).unwrap();
      setSubscriptions((prev) => prev.filter(sub => sub._id !== subscription._id));
      return subscription;
    } catch (error) {
      throw error;
    }
  }

  const handlers = {
    create,
    update,
    remove,
  }

  return { subscriptions, handlers };
}
