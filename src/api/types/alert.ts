import { Device } from "./device";
import { User } from "./user"

export enum AlertCondition {
  GREATER_THAN = '>',
  LESS_THAN = '<',
  EQUALS = '='
}

export type Alert = {
  _id: string

  user: string | User;

  device: string | Device;

  value_name: string;

  if: {
    condition: AlertCondition;
    value: number;
  }

  triggered_count: number;

  createdAt: string;

  updatedAt: string;
}
