import { ReactNode } from "react";

// import { Box } from "@mui/material";
import { AlertSvg, BarChartSvg, BillSvg, LineChartSvg, RealtimeChart, ReportSvg, ZipSvg } from "@components/icons";
import theme from "src/theme";

export type Feature = {
  icon: ReactNode;
  title: string;
  description: string
  color?: string;
};

export const features: Feature[] = [
  {
    icon: <RealtimeChart width={50} height={50} fill={theme.palette.primary.dark} />,
    title: "Real-time visualization",
    description: "Check device health and read device sent messages in realtime."
  },
  {
    icon: <LineChartSvg width={50} height={50} fill={theme.palette.primary.dark}/>,
    title: "Consumption monitoring",
    description: "Instantaneous, daily, monthly and annual consumption monitoring."
  },
  {
    icon: <BarChartSvg width={50} height={50} fill={theme.palette.primary.dark} />,
    title: "Detection of consumption peaks",
    description: "Easely find out max, min, average."
  },
  {
    icon: <BillSvg width={50} height={50} fill={theme.palette.primary.dark} />,
    title: "Bill estimation",
    description: "Update your settings and get cost estimations."
  },
  {
    icon: <ZipSvg width={50} height={50} fill={theme.palette.primary.dark} />,
    title: "Export your data",
    description: "You'll be able to export data into various formats."
  },
  {
    icon: <AlertSvg width={50} height={50} fill={theme.palette.primary.dark} />,
    title: "Alerts",
    description: "User defined alerts."
  },
  {
    icon: <ReportSvg width={50} height={50} fill={theme.palette.primary.dark} />,
    title: "Monthly Reports",
    description: "Automatically monthly generated reports sent to email inbox."
  },
]; 


