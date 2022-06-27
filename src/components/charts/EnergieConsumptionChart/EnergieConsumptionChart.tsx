import { Box, CircularProgress, Stack, Typography, useTheme } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useQuery } from 'react-query';

import ChartOptionsMenu from '../ChartOptionsMenu';

import api from '@api';

// register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface EnergieConsumptionChartProps {
  subscription: string;
  device: string;
}

const EnergieConsumptionChart = ({ subscription, device }: EnergieConsumptionChartProps) => {
  const theme = useTheme();
  const [chartTime, setChartTime] = useState('1m')
  
  const { data: energieData, isLoading } = useQuery(
    ["energie-data", chartTime], 
    ({ queryKey }) => api.data.energie({ s: subscription, d: device, t: queryKey[1] as any })
  )

  
  return (
    <Box style={{ height: 400,  position: 'relative' }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h6">Energie Consumption Chart</Typography> 
        <Stack direction="row" spacing={2} alignItems={"center"}> 
          {isLoading && <CircularProgress size={25} />}
          <ChartOptionsMenu       
            value={chartTime}
            items={[
              { label: '1 Day', value: '1d' },
              { label: '1 Month', value: '1m' },
              { label: '1 Year', value: '1y' },
            ]}
            onChange={(value) => {
              console.log((value));
              setChartTime(value);
            }}
          />
        </Stack>
      </Stack>
      <Bar
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top' as const,
            },
            // title: {
            //   display: true,
            //   text: 'Chart.js Bar Chart',
            // },
          },
        }}
        data={{
          labels: energieData ? energieData.slice(1).map((d) => d._id) : [],
          datasets: [
            {
              label: "Energie (kw/h)",
              data: energieData ? energieData.slice(1).map((d) => d.consumed) : [],
              backgroundColor: theme.palette.primary.main,
            },
          ],
        }}
      />
    </Box>
  )
}

export default EnergieConsumptionChart;
