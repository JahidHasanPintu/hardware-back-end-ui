import React from 'react';
import { Line } from 'react-chartjs-2';

const WeeklyRevenueChart = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label: 'Weekly Revenue',
        data: data.map((entry) => entry.revenue),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'week',
          displayFormats: {
            week: 'MMM DD',
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line key={JSON.stringify(data)} data={chartData} options={chartOptions} />;
};

export default WeeklyRevenueChart;
