import { Paper, PaperProps, Stack, Typography } from "@mui/material";

import { Value } from "@api/types/value";

import dayjs from 'dayjs';

interface ValueCardProps extends PaperProps {
  value: Value
}

const ValueCard = ({value, sx, ...rest}: ValueCardProps) => {
  return (
    <Paper
      variant='outlined'
      sx={{ 
        p: 2, 
        minWidth: 200,
        borderRadius: 2,
        mb: 1,
        ...sx
      }}
      {...rest}
    >
      <Typography variant="h6">{value.name}</Typography>
      <Stack>
        <Typography >{value.latest_value.value ? value.latest_value.value.toFixed(2): "--.--"  }</Typography>
        <Typography>
          {value.latest_value.timestamp ? dayjs(new Date(value.latest_value.timestamp)).format("YYYY/MM/DD hh:mm:ss" ) : '--/--/-- --:--'}
        </Typography>
      </Stack>
    </Paper>
  )
}

export default ValueCard;

