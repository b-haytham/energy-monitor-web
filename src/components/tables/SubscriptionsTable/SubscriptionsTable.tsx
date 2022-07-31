import { Chip, Typography } from "@mui/material";
import { 
  DataGrid, 
  GridColDef, 
  GridRenderCellParams, 
  GridValueGetterParams 
} from "@mui/x-data-grid";

import TableOptionsMenu from "../TableOptionsMenu/TableOptionsMenu";
import TableLink from "../TableLink";

import { useAppSelector } from "@redux/store";

import { Subscription } from "@api/types/subscription";

interface SubscriptionsTableProps {
  subscriptions: Subscription[]
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const SubscriptionsTable = ({ subscriptions, onView, onEdit, onDelete }: SubscriptionsTableProps) => {
  const loggedInUser = useAppSelector(state => state.auth.user); 

  const columns: GridColDef[] = [
    { 
      field: 'name', 
      headerName: 'Name', 
      flex: 1,
      minWidth: 130,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.company_info.name;
      }
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.company_info.email;
      }
    },
    { 
      field: 'phone', 
      headerName: 'Phone', 
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.company_info.phone;
      }
    },
    ...(loggedInUser && loggedInUser.role.includes('admin') ? [{ 
        field: "administrator",  
        headerName: "Administrator",
        flex: 1,
        minWidth: 150,
        valueGetter: (params: GridValueGetterParams) => `${params.row.admin.first_name} + ${params.row.admin.last_name}`,
        renderCell: ({ row }: GridRenderCellParams) => {
          return (
            <TableLink
              href={`/admin/dash/users`}
              text={`${row.admin.first_name}  ${row.admin.last_name}`}
              tooltip={
                 <>
                   <Typography>{`${row.admin.first_name} + ${row.admin.last_name}`}</Typography>
                   <Typography>{row.admin.email}</Typography>
                 </>
              }
            />
          )
        },
      }] : []),
    {
      field: 'address',
      headerName: 'Address',
      flex: 2,
      minWidth: 200,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.company_info.address.country || ''}, ${params.row.company_info.address.street || ''}`,
    },
    {
      field: 'devices',
      headerName: 'Devices',
      flex: 1,
      minWidth: 100,
      type: 'number',
      sortable: true,
      valueGetter: (params: GridValueGetterParams) => params.row.devices.length,
    },
    {
      field: 'users',
      headerName: 'Users',
      flex: 1,
      minWidth: 100,
      type: 'number',
      sortable: true,
      valueGetter: (params: GridValueGetterParams) => params.row.users.length,
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
  ];

  return (
    <DataGrid 
      columns={columns}
      rows={subscriptions}
      getRowId={(row) => row._id}
    />
  )
}

export default SubscriptionsTable;
