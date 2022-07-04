import { CreateAlertDto, UpdateAlertDto } from "@api/alerts";
import { Alert } from "@api/types/alert";
import { createAlert, deleteAlert, updateAlert } from "@redux/alerts/actions";
import { useAppDispatch } from "@redux/store";
import { useState } from "react";

export const useAlerts = (initialAlerts: Alert[]) => {
  const dispatch = useAppDispatch();
  const [alerts, setAlerts] = useState(initialAlerts);

  const create = async  (data: CreateAlertDto) => {
    try {
      const alert = await dispatch(createAlert(data)).unwrap();
      setAlerts(prev => [alert, ...prev]);
      return alert;
    } catch (error) {
      throw error;
    }
  };

  const update = async  (data: UpdateAlertDto & { _id: string }) => {
    try {
      const alert = await dispatch(updateAlert(data)).unwrap();
      setAlerts(prev => prev.map(al => al._id == alert._id ? alert : al));
      return alert;
    } catch (error) {
      throw error;
    }
  };


  const remove = async  (id: string) => {
    try {
      const alert = await dispatch(deleteAlert(id)).unwrap();
      setAlerts((prev) => prev.filter(al => al._id !== alert._id))
      return alert;
    } catch (error) {
      throw error;
    }
  };


  const handlers = {
    create,
    update,
    remove,
  };

  return { alerts, handlers };
}
