import { useMemo } from "react";
import dayjs from 'dayjs';

import { Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";

import TableOptionsMenu from "../TableOptionsMenu/TableOptionsMenu";
import Link from "@components/Link";

import { useAppSelector } from "@redux/store";
import { Report } from "@api/types/reports";

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
  const loggedInUser = useAppSelector(state => state.auth.user);
  
  const columns: GridColDef[] = useMemo(() => [
    ...(loggedInUser && loggedInUser.role.includes('admin') ? [{ 
        field: "subscription",  
        headerName: "Subscription",
        flex: 1,
        minWidth: 150,
        valueGetter: ({ row }: GridValueGetterParams) => row.subscription.company_info.name,
        renderCell: ({ row }: GridRenderCellParams) => {
          return (
            <Tooltip
              title={
                <>
                  <Typography>{row.subscription.company_info.name}</Typography>
                  <Typography>{row.subscription.company_info.email}</Typography>
                </>
              }
            >
              <Link 
                href={`/admin/dash/subscriptions/${row.subscription._id}`}
                sx={{ 
                  color: (theme) => theme.palette.text.primary,
                }} 
              >
                {row.subscription.company_info.name}
              </Link>
            </Tooltip>
          )
        },
      }] : []),
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
  ], [reports, loggedInUser]);

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
