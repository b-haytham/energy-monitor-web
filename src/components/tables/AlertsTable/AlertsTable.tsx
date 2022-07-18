
import { Chip } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import TableOptionsMenu from "../TableOptionsMenu/TableOptionsMenu";

import { Alert } from "@api/types/alert";

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

interface AlertsTableProps {
  alerts: Alert[]
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

const AlertsTable = ({ 
  alerts, 
  onDelete, 
  onEdit, 
  onView 
}: AlertsTableProps) => {
  
  const columns: GridColDef[] = [
    { 
      field: 'device', 
      headerName: 'Device', 
      flex: 1,
      minWidth: 130,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.device.name;
      }
    },
    { 
      field: 'value_name', 
      headerName: 'Value name', 
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) => {
        //@ts-ignore
        return value_map[params.row.value_name];
      }
    },
    { 
      field: 'condition', 
      headerName: 'Condition', 
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.if.condition;
      }
    },
    { 
      field: 'value', 
      headerName: 'Condition Value', 
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.if.value;
      }
    },
    { 
      field: 'trigger_count', 
      headerName: 'trigger count', 
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.trigger_count;
      }
    },
    {
      field: 'options',
      headerName: 'Options',
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }) => {
        return (
          <TableOptionsMenu 
            onView={onView ? () => onView(row._id) : undefined}
            onEdit={onEdit ? () => onEdit(row._id) : undefined}
            onDelete={onDelete ? () =>  onDelete(row._id) : undefined}
          />
        );
      }
    },
  ];

  return (
    <DataGrid 
      columns={columns}
      rows={alerts}
      getRowId={(row) => row._id}
      sx={{ borderRadius: 2 }}
    />
  )
}

export default AlertsTable;
