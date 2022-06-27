import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import ChartOptionsMenu from '../ChartOptionsMenu';

// register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface PowerChartProps {
  subscription: string;
  device: string;
}

const fakeNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const PowerChart = ({}: PowerChartProps) => {
  const [chartTime, setChartTime] = useState('1m');
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  return (
    <Box style={{ height: 400,  position: 'relative' }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h6">Power Chart</Typography> 
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
      <Line
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
          labels,
          datasets: [
            {
              label: 'Dataset 1',
              data: labels.map(() => fakeNumber(0, 1000)),
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Dataset 2',
              data: labels.map(() => fakeNumber(0,1000)),
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        }}
      />
    </Box>
  )
}

export default PowerChart;
