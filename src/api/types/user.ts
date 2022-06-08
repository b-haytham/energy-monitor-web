import { Subscription } from "./subscription";

export enum Role {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  SUPER_USER = "super_user",
  USER = "user",
}

export type User = {
  _id: string;

  first_name: string;

  last_name: string;

  email: string;

  role: Role;

  phone?: string;

  logged_in: boolean;

  subscription?: string | Subscription

  last_logged_in: string;

  verified: boolean;

  createdAt: string;

  updatedAt: string;
};
