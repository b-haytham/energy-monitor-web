import React from "react";

import { 
  alpha, 
  Box, 
  Divider, 
  IconButton, 
  Menu, 
  MenuItem, 
  MenuProps, 
  styled 
} from "@mui/material";

import { Delete, Edit, MoreVert, Visibility } from "@mui/icons-material";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

interface TableOptionsMenuProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TableOptionsMenu = ({ onEdit, onView, onDelete }: TableOptionsMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  if (!onDelete && !onEdit && !onView) {
    return null;
  }

  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      > 
        {!onDelete && !onEdit && !onView && <Box />}
        {onView && <MenuItem 
          onClick={() => {
            onView();
            handleClose();
          }} 
          disableRipple
        >
          <Visibility />
          View
        </MenuItem>}
        {onEdit && <MenuItem 
          onClick={() => {
            onEdit();
            handleClose();
          }} 
          disableRipple
        >
          <Edit />
          Edit
        </MenuItem>}
        {onDelete && <Divider sx={{ my: 0.5 }} />}
        {onDelete && <MenuItem 
            onClick={() => {
              onDelete();
              handleClose();
            }} 
            disableRipple 
            color="secondary"
          >
            <Delete />
            Delete
          </MenuItem>}
      </StyledMenu>
    </>
  )
}

export default TableOptionsMenu;
