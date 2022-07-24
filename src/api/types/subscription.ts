import { Device } from "./device";
import { User } from "./user";

export type Address = {
  street: string;

  city: string;

  state: string;

  country: string;

  zip: number;
};

export type CompanyInfo = {
  name: string;

  email: string;

  phone: string;

  address: Address;

  logo: {
    filename: string | null;
    path: string | null;
  };

  energie_cost: number | null;

  currency: string | null;
};

export type Subscription = {
  _id: string;

  admin: string | User;

  company_info: CompanyInfo;

  users: string[] | User[];
  
  devices: string[] | Device[];

  blocked: boolean;

  createdAt: string;

  updatedAt: string;
};
