import { Subscription } from "./subscription";

export type ReportItem = {
  device: string;
  device_name: string;
  consumed: number;
  cost: number;
};

export type ReportFile = {
  name: string;
  path: string;
  url: string;
};

export type Report = {
  _id: string;

  subscription: string | Subscription;

  items: ReportItem[];

  total: number;

  cost: number; 

  file: ReportFile;

  date: string;

  createdAt: string;

  updatedAt: string;
}
