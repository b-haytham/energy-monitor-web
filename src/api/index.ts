import { data } from "./data";
import { auth } from "./auth";
import { devices } from "./devices";
import { subscriptions } from "./subscriptions";
import { users } from "./users";

const api = {
  auth,
  subscriptions,
  devices,
  users,
  data
};

export default api;
