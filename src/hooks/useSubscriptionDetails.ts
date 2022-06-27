import { useState } from "react";

import { Subscription } from "@api/types/subscription";
import { User } from "@api/types/user";

export const useSubscriptionDetails = (initialSubscription: Subscription) => {
  const [subscription, setSubscription] = useState(initialSubscription);
  const [admin, setAdmin] = useState(subscription.admin as User);
  const [users, setUsers] = useState(subscription.users as User[])

  const handlers = {}

  return { subscription, admin, users, handlers };
}
