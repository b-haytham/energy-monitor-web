import { Chip } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import TableOptionsMenu from "../TableOptionsMenu/TableOptionsMenu";

import { Report } from "@api/types/reports";

import dayjs from 'dayjs';
import { useMemo } from "react";

interface ReportsTableProps {
  reports: Report[]
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

const ReportsTable = ({ 
  reports, 
  onDelete, 
  onEdit, 
  onView 
}: ReportsTableProps) => {
  
  const columns: GridColDef[] = useMemo(() => [
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      minWidth: 130,
      valueGetter: (params: GridValueGetterParams) => {
        return dayjs(new Date(params.row.date)).format('YYYY/MM');
      }
    },
    {
      field: 'total',
      headerName: 'Consumed',
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) => {
        return +params.row.total.toFixed(2) + " kw/h";
      }
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) => {
        return +params.row.cost.toFixed(2);
      }
    },
    {
      field: 'pdf_path',
      headerName: 'File',
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) => {
        // return +params.row.cost.toFixed(2);
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
  ], [reports]);

  return (
    <DataGrid
      columns={columns}
      rows={reports}
      getRowId={(row) => row._id}
      sx={{ borderRadius: 2 }}
    />
  )
}

export default ReportsTable;
