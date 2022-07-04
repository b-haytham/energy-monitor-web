import { Alert } from "./alert";

export type TriggeredAlert = {
  _id: string; 
  
  alert: Alert;

  value: number;

  createdAt: string;

  updatedAt: string;
}
