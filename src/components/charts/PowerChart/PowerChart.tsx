import { createRef, useEffect, useRef, useState } from 'react';
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
  TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { useQuery, useQueryClient } from 'react-query';
import api from '@api';

// register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

//@ts-ignore
import 'chartjs-adapter-date-fns';
import socket from 'src/socket';

interface PowerChartProps {
  subscription: string;
  device: string;
}

const PowerChart = ({ subscription, device }: PowerChartProps) => {
  const queryClient = useQueryClient();
  const chartRef = createRef<ChartJS<'line'>>()   
  const { data: d } = useQuery<{t: string; v: string}[]>([`power-${device}`], () => {
    return api.data.power({ s: subscription, d: device })
  })

  useEffect(() => {
    socket.on(`notification/${device}`, (data) => {
      // const queryData = queryClient.getQueryData([`power-${device}`])
      // 
      // queryClient.setQueryData([`power-${device}`], (cached) => {
      //   //@ts-ignore
      //   return [...cached, data];
      // })
      const chart = chartRef.current;
      chart?.data?.datasets[0].data?.shift();

      chart?.data?.datasets[0].data?.push({ x: data.t, y: data.p['p'] });

      chart?.update();
    })
    return () => {
      socket.off(`notification/${device}`)
    }
  }, [device])

  return (
    <Box style={{ height: 400,  position: 'relative' }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h6">Power Last 2 days</Typography> 
      </Stack>
      <div style={{ position: 'relative', height: '100%', width: '99%' }}>
        <Line
          //@ts-ignore
          ref={chartRef}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: {
              legend: {
                position: 'top' as const,
              },
            },
           scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'minute',
                },
                displayFormats: {
                  hour: "hh:mm"
                }
              }
            }
          }}
          data={{
            datasets: [
              {
                label: 'Power (kw)',
                data: d ? [...d.map((it) => ({x: it.t, y: it.v}))] : [],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
            ],
          }}
        />
      </div>
    </Box>
  )
}

export default PowerChart;
