import { Box, Paper, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

interface CountCardProps {
  title: string;
  count: number;
  icon?: ReactNode
}

const CountCard= ({ title, count, icon }: CountCardProps) => {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
      <Stack direction={'row'} justifyContent="space-between">
        <Box>
          <Typography variant="h3">{count}</Typography>
          <Typography fontWeight={700}>{title}</Typography>
        </Box>
        {icon && icon}
      </Stack>
    </Paper>
  )
}

export default CountCard;
