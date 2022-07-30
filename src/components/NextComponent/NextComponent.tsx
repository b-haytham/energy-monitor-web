import { useEffect } from "react";
import { useRouter } from "next/router";
import { NextComponentType, NextPageContext } from "next";
import { useSnackbar } from "notistack";

import Layout from "@components/layouts/DashboardLayout";
import MainLayout from "@components/layouts/MainLayout";

import { useAppDispatch } from "@redux/store";
import { addTriggeredAlert } from "@redux/alerts/alertsSlice";
import { deviceHandleNotification } from "@redux/devices/devicesSlice";
import { addAppNotification, AppNotificationType } from "@redux/global/globalSlice";
import { createReport } from "@redux/reports/reportsSlice";

import socket from "src/socket";

interface NextComponentProps {
  Component: NextComponentType<NextPageContext, any, {}>
  pageProps: any
}

const NextComponent = ({ Component, pageProps }: NextComponentProps) =>  {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    socket.on('authenticated', (data) => {
      console.log('WS_AUTHENTICATED', data);
      enqueueSnackbar("WS authenticated!");
    })

    socket.on('device/notification', (data) => {
      console.log('WS_DEVICE_NOTIFICATION', data);
      dispatch(deviceHandleNotification(data));
    })

    socket.on('report/generated', (data) => {
      console.log('WS_REPORT_GENERATED', data);
      dispatch(createReport(data));
      dispatch(addAppNotification({ 
        type: AppNotificationType.ReportGenerated, 
        ...data 
      }))
      // enqueueSnackbar("Report Generated", { variant: 'info' })
    })

    socket.on('alert/triggered', (data) => {
      console.log('WS_TRIGGERED_ALERT', data);
      dispatch(addTriggeredAlert(data));
      dispatch(addAppNotification({ 
        type: AppNotificationType.TriggeredAlert, 
        ...data 
      }))
    })

    socket.on('device/connection/connected', (data) => {
      console.log('WS_DEVICE_CONNECTED', data);
      dispatch(addAppNotification({ 
        type: AppNotificationType.DeviceConnectAttempt, 
        ...data 
      }))
    })

    socket.on('device/connection/lost', (data) => {
      console.log('WS_DEVICE_CONNECTION_LOST', data);
      dispatch(addAppNotification({ 
        type: AppNotificationType.DeviceConnectionLost, 
        ...data 
      }))
    })

    socket.on('device/connection/disconnected', (data) => {
      console.log('WS_DEVICE_DISCONNECTED', data);
      dispatch(addAppNotification({ 
        type: AppNotificationType.DeviceDisconnected,
        ...data 
      }))
    })

    socket.on('device/authentication/success', (data) => {
      console.log('WS_AUTHETICATION_SUCCESS', data);
      dispatch(addAppNotification({ 
        type: AppNotificationType.DeviceAuthenticated,
        ...data 
      }))
    })

    socket.on('device/authentication/failed', (data) => {
      console.log('WS_AUTHETICATION_FAILED', data);
      dispatch(addAppNotification({ 
        type: AppNotificationType.DeviceAuthenticationFailed,
        ...data 
      }))
    })

    return () => {
      socket.off('authenticated');
      socket.off('device/notification');
      socket.off('report/generated');
      socket.off('alert/triggered');

      socket.off('device/connection/connected');
      socket.off('device/connection/lost');
      socket.off('device/connection/disconnected');

      socket.off('device/authentication/success');
      socket.off('device/authentication/failed');
    }

  }, [])

  return (
    <>
      {router.pathname.includes('dash') 
      ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : 
      ( <Component {...pageProps} />)} 
    </>
  )
}

export default NextComponent;
