import { Alert } from "@api/types/alert";
import { Device } from "@api/types/device";
import { TriggeredAlert } from "@api/types/triggered-alert"
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"

import dayjs from 'dayjs';

interface TriggeredAlertsTableProps {
  triggeredAlerts: TriggeredAlert[]
  alert: Alert;
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

const value_map = {
  s: 'Status',
  e: 'Energie',
  p: 'Power',
  u: 'Tension',
  i: 'Current',
  i1: 'Current 1',
  i2: 'Current 2',
  i3: 'Current 3',
  u1: 'Tension 1',
  u2: 'Tension 1',
  u3: 'Tension 1',
}

const TriggeredAlertsTable = ({
  triggeredAlerts, 
  alert,
  onView,
  onEdit,
  onDelete,
}: TriggeredAlertsTableProps) => {
  const columns: GridColDef[] = [
    { 
      field: 'device', 
      headerName: 'Device', 
      flex: 1,
      minWidth: 130,
      valueGetter: (params: GridValueGetterParams) => {
        return (alert.device as Device).name;
      }
    },
    { 
      field: 'value_name', 
      headerName: 'Value name', 
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) => {
        //@ts-ignore
        return value_map[params.row.alert.value_name];
      }
    },
    { 
      field: 'condition', 
      headerName: 'Condition', 
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.alert.if.condition;
      }
    },
    { 
      field: 'value', 
      headerName: 'Condition Value', 
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.alert.if.value;
      }
    },
    { 
      field: 'trigger_value', 
      headerName: 'Trigger value', 
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) => {
        const device = alert.device as Device;
        const value = device.values.find(val => val.accessor == params.row.alert.value_name)
        return params.row.value.toFixed(2) + ` (${value?.unit ?? ""})`;
      }
    },
    { 
      field: 'time', 
      headerName: 'Time', 
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) => {
        return  dayjs(new Date(params.row.createdAt)).format('YYYY/MM/DD hh:mm:ss');
      }
    },
  ];
  return (
    <DataGrid 
      columns={columns}
      rows={triggeredAlerts}
      getRowId={(row) => row._id}
      sx={{ borderRadius: 2 }}
    />
  )
}

export default TriggeredAlertsTable;