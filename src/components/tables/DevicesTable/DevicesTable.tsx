import { Chip } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import TableOptionsMenu from "../TableOptionsMenu/TableOptionsMenu";

import { Device } from "@api/types/device";

interface DevicesTableProps {
  devices: Device[]
}

const DevicesTable = ({ devices }: DevicesTableProps) => {
  const columns: GridColDef[] = [
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
            onView={() => console.log(row._id)}
            onEdit={() => console.log(row._id)}
            onDelete={() => console.log(row._id)}
          />
        );
      }
    },
  ];

  return (
    <DataGrid 
      columns={columns}
      rows={devices}
      getRowId={(row) => row._id}
    />
  )
}

export default DevicesTable;
