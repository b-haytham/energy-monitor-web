
import { Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";

import TableOptionsMenu from "../TableOptionsMenu/TableOptionsMenu";
import Link from "@components/Link";

import { Alert } from "@api/types/alert";
import { useAppSelector } from "@redux/store";

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
  u2: 'Tension 2',
  u3: 'Tension 3',
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
  const loggedInUser = useAppSelector(state => state.auth.user);
  const columns: GridColDef[] = [
    { 
      field: 'device', 
      headerName: 'Device', 
      flex: 1,
      minWidth: 130,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.device.name;
      },
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Tooltip
            title={
              <>
                <Typography>{row.device.name}</Typography>
              </>
            }
          >
            <Link
              href={
                loggedInUser?.role.includes('admin') ?
                `/admin/dash/devices/${row.device._id}` :
                `/dash/devices/${row.device._id}`
              }
              sx={{ 
                color: (theme) => theme.palette.text.primary,
              }} 
            >
              {row.device.name}
            </Link>
          </Tooltip>
        )
      },
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
