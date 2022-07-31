import { Tooltip, TooltipProps } from "@mui/material";

import Link, { LinkProps } from "@components/Link";

interface TableLinkProps extends LinkProps {
  text: string;
  tooltip?: TooltipProps["title"]
}

const TableLink = ({ href, text, tooltip, sx, ...rest }: TableLinkProps) => {
  return tooltip ? (
    <Tooltip title={tooltip}>
      <Link 
        href={href}
        sx={{ 
          color: (theme) => theme.palette.primary.main,
          fontWeight: 'bolder',
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' },
          ...sx
        }} 
        {...rest}
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
        '&:hover': { textDecoration: 'underline' },
        ...sx
      }} 
      {...rest}
    >
      {text}
    </Link>
  )
}

export default TableLink
