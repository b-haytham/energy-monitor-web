import { data } from "./data";
import { auth } from "./auth";
import { devices } from "./devices";
import { subscriptions } from "./subscriptions";
import { users } from "./users";
import { reports } from "./reports";
import { alerts } from "./alerts";

const api = {
  auth,
  subscriptions,
  devices,
  users,
  data,
  reports,  
  alerts
};

export default api;
