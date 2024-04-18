import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, ChartData, ChartOptions, TooltipItem, TooltipModel, registerables } from 'chart.js';
import { Paper } from '@mui/material';

interface AnalyticsChartProps {
    data: ChartData<'bar'>,
    options: ChartOptions<'bar'>
}

const AnalyticsChart = ({data, options}: AnalyticsChartProps) => {

    const chartRef = React.useRef(null);
    // Register time scale globally
    Chart.register(...registerables);

    return (
        <Paper sx={{ 
            backgroundColor: 'white', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            width: '60vw',
            minWidth: '800px' }}
        >
            <h2>Analytics</h2>
            <div style={{ marginBottom: '40px', width: '50vw', minWidth: '700px' }}>
                <Bar 
                    ref={chartRef}
                    data={data} 
                    options={options} 
                    id="chart"
                />
            </div>
        </Paper>
    );
};

export default AnalyticsChart;