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
