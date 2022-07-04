import { Chip } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import TableOptionsMenu from "../TableOptionsMenu/TableOptionsMenu";

import { User } from "@api/types/user";

interface UsersTableProps {
  users: User[],
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const UsersTable = ({ users, onEdit, onView, onDelete }: UsersTableProps) => {
  const columns: GridColDef[] = [
    { 
      field: 'first_name', 
      headerName: 'First Name', 
      flex: 1,
      minWidth: 130,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.first_name;
      }
    },
    { 
      field: 'last_name', 
      headerName: 'Last Name', 
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.last_name;
      }
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.email;
      }
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 2,
      minWidth: 200,
      sortable: true,
      valueGetter: (params: GridValueGetterParams) => params.row.phone ? params.row.phone : '°°'
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 2,
      minWidth: 200,
      sortable: true,
      valueGetter: (params: GridValueGetterParams) => params.row.role,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 200,
      // valueGetter: (params: GridValueGetterParams) => params.row.blocked,
      renderCell: ({}) => {
        return <Chip size="small" label={"Active"} color={"success"} />;
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
            onView={() => onView(row._id)}
            onEdit={() => onEdit(row._id)}
            onDelete={() => onDelete(row._id)}
          />
        );
      }
    },
  ];

  return (
    <DataGrid 
      columns={columns}
      rows={users}
      getRowId={(row) => row._id}
      sx={{ borderRadius: 2 }}
    />
  )
}

export default UsersTable;
