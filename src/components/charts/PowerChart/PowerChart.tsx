import { createRef, useEffect, useRef, useState } from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeSeriesScale,
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
  TimeScale,
  TimeSeriesScale,
);

//@ts-ignore
import 'chartjs-adapter-date-fns';
import socket from 'src/socket';

interface PowerChartProps {
  subscription: string;
  device: string;
}

const PowerChart = ({ subscription, device }: PowerChartProps) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const chartRef = createRef<ChartJS<'line'>>()   

  const { data: d } = useQuery<{t: string; v: string}[]>([`power-${device}`], () => {
    return api.data.power({ s: subscription, d: device })
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    retryOnMount: false,
    staleTime: 1000 * 60 * 60 * 24
  })

  useEffect(() => {
    socket.on(`notification/${device}`, (data) => {
      queryClient.setQueryData(`power-${device}`, (prev) => {
        console.log(prev);
        const lastArr = Array.isArray(prev) && prev.length > 20 ? prev.slice(1) : prev as any[];
        return [...lastArr , {t: data.t, v: data.p['p']}]
      })
    
    })
    return () => {
      socket.off(`notification/${device}`)
    }
  }, [])

  return (
    <Box style={{ height: 400,  position: 'relative' }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h6">Power (kw)</Typography> 
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
                // time: {
                //   unit: 'second',
                // },
                // displayFormats: {
                //   hour: "hh:mm"
                // }
              },
              y: {
                beginAtZero: true
              }
            }
          }}
          data={{
            datasets: [
              {
                label: 'Power (kw)',
                // data: d ? [...d.map((it) => ({x: it.t, y: it.v}))] : [],
                data: d?.slice(-20).map(d => ({ x: d.t, y: d.v })) ?? [],
                backgroundColor: theme.palette.primary.main,
              },
            ],
          }}
        />
      </div>
    </Box>
  )
}

export default PowerChart;
