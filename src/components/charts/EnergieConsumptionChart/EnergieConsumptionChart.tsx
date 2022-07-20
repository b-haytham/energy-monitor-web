import { Box, CircularProgress, Stack, Typography, useTheme } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
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
  Legend,
  TimeScale,
);

//@ts-ignore
import 'chartjs-adapter-date-fns';

interface EnergieConsumptionChartProps {
  subscription: string;
  device: string;
}

const EnergieConsumptionChart = ({ subscription, device }: EnergieConsumptionChartProps) => {
  const theme = useTheme();
  const [chartTime, setChartTime] = useState('1m')
  
  const { data: energieData, isLoading } = useQuery(
    [`energie-data-${device}`, chartTime], 
    ({ queryKey }) => api.data.energie({ s: subscription, d: device, t: queryKey[1] as any })
  )

  const parseTimeField = (t: string) => {
    const newStr = t.replace('\'', "");
    return newStr.split(' ').join('T');

  }

  const getDataset = (data?: any[]) => {
    if(!data) return [];

    if(data.length == 0) return [];
    
    if (chartTime == '1d') {
      
      if(data.length == 1) return data.map(d =>({ x: parseTimeField(d._id), y: d.consumed }));

      return data.map(d => ({ x: parseTimeField(d._id), y: d.consumed }));
    }
  
    if(data.length == 1) return data.map(d =>({ x: d._id, y: d.consumed }));

    return data.map(d => ({ x: d._id, y: d.consumed }));
  }

  return (
    <Box style={{ height: 400,  position: 'relative' }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h6">Power Consumption (kw/h)</Typography> 
        <Stack direction="row" spacing={2} alignItems={"center"}> 
          {isLoading && <CircularProgress size={25} />}
          <ChartOptionsMenu       
            value={chartTime}
            items={[
              { label: 'Last 24h', value: '1d' },
              { label: 'Last 30 days', value: '1m' },
              { label: 'Last 12 months', value: '1y' },
            ]}
            onChange={(value) => {
              setChartTime(value);
            }}
          />
        </Stack>
      </Stack>
      <div style={{ position: 'relative', height: '100%', width: '99%' }}>
        <Bar
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top' as const,
              },
            },
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: chartTime == '1d' ? 'hour' : chartTime == '1m' ? "day" : 'month'
                }
              },
            }
          }}
          data={{
            // labels: energieData ? energieData.slice(1).map((d) => d._id) : [],
            // labels: getLabels(energieData),
            datasets: [
              {
                label: "Energie (kw/h)",
                // data: energieData ? energieData.slice(1).map((d) => d.consumed) : [],
                data: getDataset(energieData),
                backgroundColor: theme.palette.primary.main,
              },
            ],
          }}
        />
      </div>
    </Box>
  )
}

export default EnergieConsumptionChart;
