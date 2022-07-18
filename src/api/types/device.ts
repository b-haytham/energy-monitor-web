import { Subscription } from "./subscription";
import { Value } from "./value";

export enum DeviceType {
  TRI = "TRI",
  MONO = "MONO",
  PV = "PV",
}

export type Device = {
  _id: string;

  name: string;

  description: string;

  type: DeviceType;

  subscription: string | Subscription;

  power: number;

  energie: number;
  
  values: Value[];

  blocked: boolean;

  createdAt: string;

  updatedAt: string;
};
