import api from '@api';
import { Device } from '@api/types/device';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useQuery } from 'react-query';

import ChartOptionsMenu from '../ChartOptionsMenu';

// register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

//@ts-ignore
import 'chartjs-adapter-date-fns';

interface EnergieConsumptionChartProps {
  subscription: string
  devices: Device[]
}

const colorArray = ['#556cd6', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

const EnergieConsumptionChart = ({ devices, subscription }: EnergieConsumptionChartProps) => {
  const [chartTime, setChartTime] = useState('1m');

  const { data: energieData, isLoading } = useQuery(
    [`total-energie-${subscription}`, chartTime], 
    ({ queryKey }) => {
      const promises = devices.map(device => api.data.energie({ s: subscription, d: device._id, t: queryKey[1] as any }))
      return Promise.all(promises);
    }
  )
  // console.log("Total energie data >>", energieData);
  

  const getDatasets = (data?: any[]) => {
    if (!data) return [];

    return data.map((chunk, idx) => ({
      label: devices[idx] ? devices[idx].name : "Unknown",
      data: chunk.map((d: any) =>({ x: d._id, y: d.consumed})),
      backgroundColor: colorArray[idx],
    }))
  }

  console.log(energieData);
  return (
    <Box style={{ height: 400,  position: 'relative' }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h6">Total Energie Consumption Chart</Typography> 
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
                stacked: true,
                time: {
                  unit: chartTime == '1d' ? 'hour' : chartTime == '1m' ? "day" : 'month'
                }
              },
              y: {
                stacked: true,
              },
            },
          }}
          data={{
            datasets: getDatasets(energieData),
          }}
        />
      </div>
    </Box>
  )
}

export default EnergieConsumptionChart;
