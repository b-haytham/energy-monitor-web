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
  Legend
);

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
    ["total-energie-data", chartTime], 
    ({ queryKey }) => {
      const promises = devices.map(device => api.data.energie({ s: subscription, d: device._id, t: queryKey[1] as any }))
      return Promise.all(promises);
    }
  )
  // console.log("Total energie data >>", energieData);
  
  const isNotEmpty = energieData?.find(d => d.length > 0)

  const labels =  isNotEmpty ? isNotEmpty.slice(1).map(d => d._id) : [];
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
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        }}
        data={{
          labels,
          //@ts-ignore
          datasets: energieData?.map((entry, idx) => ({ 
            label: devices[idx] ? devices[idx].name : [], 
            data: entry.slice(1).map(d =>d.consumed),
            backgroundColor: colorArray[idx]
          })) ?? []
          // datasets: [
          //   {
          //     label: 'Dataset 1',
          //     data: labels.map(() => fakeNumber(0, 1000)),
          //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
          //   },
          //   {
          //     label: 'Dataset 2',
          //     data: labels.map(() => fakeNumber(0,1000)),
          //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
          //   },
          // ],
        }}
      />
    </Box>
  )
}

export default EnergieConsumptionChart;
