import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import './ChartVacation.css';
import { Button } from '@mui/material'; 

Chart.register(...registerables);

export interface VacationData {
  destination: string;
  followerCount: number;
}

interface VacationChartProps {
  data: VacationData[];
  onExportCSV: () => void; 
}

function ChartVacation({ data, onExportCSV }: VacationChartProps): JSX.Element {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    console.log(data, 'Received Data');

    if (chartRef.current && data.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const labels = data.map((item) => item.destination);
        const followers = data.map((item) => item.followerCount);
        console.log(labels, 'Labels');
        console.log(followers, 'Followers');

     
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Number of users who followed this vacation',
                data: followers,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                },
              },
            },
          },
        });
      }
    }
  }, [data]);

  return (
    <div className="ChartVacation">
     <Button variant="outlined" onClick={onExportCSV} style={{ width: '100%', maxWidth: '300px' , marginLeft:'30px'}}>
Export to CSV
</Button>
      <canvas style={{ height: '300px', width: '90%', margin: 'auto', marginBottom: '20px' }} ref={chartRef}></canvas>
    </div>
  );
}


export default ChartVacation;


