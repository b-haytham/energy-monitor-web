import Layout from "@components/Layout";
import { addTriggeredAlert } from "@redux/alerts/alertsSlice";
import { deviceHandleNotification } from "@redux/devices/devicesSlice";
import { addAppNotification } from "@redux/global/globalSlice";
import { createReport } from "@redux/reports/reportsSlice";
import { useAppDispatch } from "@redux/store";
import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
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

    socket.on('report-generated', (data) => {
      console.log('WS_REPORT_GENERATED', data);
      dispatch(createReport(data));
      dispatch(addAppNotification({ type: "Report Generated", ...data }))
    })

    socket.on('triggered-alert', (data) => {
      console.log('WS_TRIGGERED_ALERT', data);
      dispatch(addTriggeredAlert(data));
      dispatch(addAppNotification({ type: "Triggered Alert", ...data }))
    })

    return () => {
      socket.off('authenticated');
      socket.off('device/notification');
      socket.off('report-generated');
      socket.off('triggered-alert');
    }

  }, [])

  return (
    <>
      {router.pathname.includes('dash') ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ): (
        <Component {...pageProps} />
      )}
    </>
  )
}

export default NextComponent;
