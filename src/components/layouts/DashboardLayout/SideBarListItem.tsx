import { ListItemButton, ListItemButtonProps, ListItemIcon, ListItemText } from "@mui/material";

interface SideBarListItemProps extends ListItemButtonProps {
  selected?: boolean
  onClick?: () => void
  icon?: React.ReactElement
  text: string
}

const SideBarListItem = ({ 
  selected,
  onClick,
  icon,
  text,
  sx,
  ...rest
}: SideBarListItemProps) => {
  return (
    <ListItemButton
      sx={{ 
        py: 1,
        borderRadius: 2,
        ...sx
      }} 
      selected={selected}
      onClick={onClick}
      {...rest}
    >
      <ListItemIcon 
        sx={{
          color: selected ? "primary.main" : undefined,
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText 
        primary={text}
        primaryTypographyProps={{ 
        fontWeight: 400, 
        color: selected ? "primary.main" : undefined,
        }}  
      />
    </ListItemButton>
  )
}

export default SideBarListItem;
