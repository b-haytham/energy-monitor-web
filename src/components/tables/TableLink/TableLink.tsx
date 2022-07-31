import { Tooltip, TooltipProps } from "@mui/material";

import Link from "@components/Link";

interface TableLinkProps {
  href: string;
  text: string;
  tooltip?: TooltipProps["title"]
}

const TableLink = ({ href, text, tooltip }: TableLinkProps) => {
  return tooltip ? (
    <Tooltip title={tooltip}>
      <Link 
        href={href}
        sx={{ 
          color: (theme) => theme.palette.primary.main,
          fontWeight: 'bolder',
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' }
        }} 
      >
        {text}
      </Link>
    </Tooltip>
  ) : (
    <Link 
      href={href}
      sx={{ 
        color: (theme) => theme.palette.primary.main,
        fontWeight: 'bolder',
        textDecoration: 'none',
        '&:hover': { textDecoration: 'underline' }
      }} 
    >
      {text}
    </Link>
  )
}

export default TableLink
