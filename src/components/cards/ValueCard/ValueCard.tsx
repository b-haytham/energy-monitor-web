import { Paper, PaperProps, Stack, Typography } from "@mui/material";

import { Value } from "@api/types/value";

import dayjs from 'dayjs';
import { Circle, RecordVoiceOver } from "@mui/icons-material";

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
        height: 1,
        ...sx
      }}
      {...rest}
    >
      <Stack direction="row" justifyContent={'space-between'} alignItems="center" sx={{ mb: 2 }}> 
        <Typography variant="h5" fontSize={20}>{value.name}</Typography>
        {value.accessor == 's' && (<Circle fontSize="small" color={value.latest_value.value ? "success" : "error"} />)}
      </Stack>
      <Stack>
        {value.accessor == 's' ? 
        (
          <Typography variant="body1" fontSize={20}  sx={{ mb: 1 }}>- </Typography>
        ) : 
        (
          <Typography variant="body1" fontSize={20} sx={{ mb: 1 }}>
            {value.latest_value.value ? value.latest_value.value.toFixed(2) + ` ${value.unit}` : "--.--"  }
          </Typography>
        )}
        
        <Typography variant="body2" >
          {value.latest_value.timestamp ? 
            dayjs(new Date(value.latest_value.timestamp)).format("YYYY/MM/DD hh:mm:ss" ) : 
            '--/--/-- --:--'}
        </Typography>
      </Stack>
    </Paper>
  )
}

export default ValueCard;

