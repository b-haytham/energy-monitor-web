import { useMemo } from "react";

import { Chip, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";

import TableOptionsMenu from "../TableOptionsMenu/TableOptionsMenu";
import Link from "@components/Link";

import { Device } from "@api/types/device";
import { useAppSelector } from "@redux/store";

interface DevicesTableProps {
  devices: Device[]
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

const DevicesTable = ({ 
  devices, 
  onDelete, 
  onEdit, 
  onView 
}: DevicesTableProps) => {
  const loggedInUser = useAppSelector(state => state.auth.user);
    
  const columns: GridColDef[] = useMemo(() => {
    return [
      { 
        field: 'name', 
        headerName: 'Name', 
        flex: 1,
        minWidth: 130,
        valueGetter: (params: GridValueGetterParams) => {
          return params.row.name;
        }
      },
      { 
        field: 'description', 
        headerName: 'Description', 
        flex: 1,
        minWidth: 150,
        valueGetter: (params: GridValueGetterParams) => {
          return params.row.description;
        }
      },
      ...(loggedInUser && loggedInUser.role.includes('admin') ? [{ 
          field: "subscription",  
          headerName: "Subscription",
          flex: 1,
          minWidth: 150,
          valueGetter: (params: GridValueGetterParams) => params.row.subscription.company_info.name,
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
        field: 'power', 
        headerName: 'Power', 
        flex: 1,
        minWidth: 150,
        valueGetter: (params: GridValueGetterParams) => {
          return +params.row.power.toFixed(2);
        }
      },
      {
        field: 'energie',
        headerName: 'Energy',
        flex: 2,
        minWidth: 200,
        sortable: true,
        valueGetter: (params: GridValueGetterParams) => +params.row.energie.toFixed(2)
      },

      {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        minWidth: 200,
        valueGetter: (params: GridValueGetterParams) => params.row.blocked,
        renderCell: ({ value }) => {
          return <Chip size="small" label={value ? 'Blocked' : 'Active'} color={value ? "error" : "success"} />;
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
    ]
  }, [loggedInUser])


  return (
    <DataGrid 
      columns={columns}
      rows={devices}
      getRowId={(row) => row._id}
      sx={{ borderRadius: 2 }}
    />
  )
}

export default DevicesTable;
