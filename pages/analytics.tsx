import PeriodSelector from '@/components/Dashboard/PeriodSelector';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useStore from '../stores';
import { filteredAggregateDataByDate, getPeriodDates } from '@/utils/data-utils';
import { ANALYTICS_PERIODS, DIMENSIONS } from '@/utils/constants';
import DeviceSelector from '@/components/Dashboard/DeviceSelector';
import AnalyticsChart from '@/components/Analytics/AnalyticsChart';
import { ChartData, ChartOptions } from 'chart.js';
import DimensionSelector from '@/components/Analytics/DimesionSelector';

const Analytics = () => {

    const { 
        electricConsumptionDataLoading, 
        electricConsumptionData, 
        getElectricConsumptionData,
        usageDataLoading,
        usageData,
        getUsageData,
        analyticsPeriod,
        setAnalyticsPeriod,
        analyticsDates,
        setAnalyticsDates,
        devices,
        dimension,
        setDimension } = useStore();

    const dataLoading = electricConsumptionDataLoading || usageDataLoading;

    const fetchData = async() => {
        await getElectricConsumptionData();
        await getUsageData();
    }

    useEffect(() => {
        fetchData();
    },[])

    const getCurrentPeriodData = () => {
        return {
            electricData: filteredAggregateDataByDate({
                data: electricConsumptionData, 
                startDate: analyticsDates.currentDates.startDate, 
                endDate: analyticsDates.currentDates.endDate, 
                deviceIds: devices }),
            usageData: filteredAggregateDataByDate({
                data: usageData, 
                startDate: analyticsDates.currentDates.startDate, 
                endDate: analyticsDates.currentDates.endDate, 
                deviceIds: devices })
        }
    }

    const getComparisonPeriodData = () => {
        return {
            electricData: filteredAggregateDataByDate({
                data: electricConsumptionData, 
                startDate: analyticsDates.comparisonDates.startDate, 
                endDate: analyticsDates.comparisonDates.endDate, 
                deviceIds: devices }),
            usageData: filteredAggregateDataByDate({
                data: usageData, 
                startDate: analyticsDates.comparisonDates.startDate, 
                endDate: analyticsDates.comparisonDates.endDate, 
                deviceIds: devices })
        }
    }

    const handleAnalyticsPeriodChange = (e: any) => {
        setAnalyticsPeriod(e.target.value);
        setAnalyticsDates({
            //@ts-ignore
            currentDates: getPeriodDates(ANALYTICS_PERIODS[e.target.value].currentPeriod),
            //@ts-ignore
            comparisonDates: getPeriodDates(ANALYTICS_PERIODS[e.target.value].comparisonPeriod),
        })
    }

    const handleDimensionChange = (e: any) => {
        setDimension(e.target.value);
    }

    const [currentData, setCurrentData] = useState(getCurrentPeriodData().electricData.aggregateData);
    const [currentDates, setCurrentDates] = useState(getCurrentPeriodData().electricData.dates);
    const [comparisonData, setComparisonData] = useState(getComparisonPeriodData().electricData.aggregateData);
    const [comparisonDates, setComparisonDates] = useState(getComparisonPeriodData().electricData.dates);

    useEffect(() => {
        //@ts-ignore
        setCurrentData(getCurrentPeriodData()[dimension].aggregateData);
        //@ts-ignore
        setCurrentDates(getCurrentPeriodData()[dimension].dates);
        //@ts-ignore
        setComparisonData(getComparisonPeriodData()[dimension].aggregateData);
        //@ts-ignore
        setComparisonDates(getComparisonPeriodData()[dimension].dates);
    }, [dataLoading, analyticsDates, devices, dimension])

    const data: ChartData<'bar'> = {
        labels: currentDates.length > comparisonDates.length ? currentDates : comparisonDates,
        datasets: [
            {
                label: 'This Period',
                data: currentData,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgb(0, 50, 255)',
                borderWidth: 1
            },
            {
                label: 'Last Period',
                data: comparisonData,
                backgroundColor: 'rgba(255, 50, 0, 0.5)',
                borderColor: 'rgba(255, 0, 0)',
                borderWidth: 1
            }
        ],
    };

    const options: ChartOptions<'bar'> = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const { dataIndex, dataset,formattedValue } = context;
                        const date = dataset.label === 'This Period' ? currentDates[dataIndex] : comparisonDates[dataIndex];
                        return `${dataset.label} : ${date} : ${formattedValue}`;
                    },
                    title: function() {
                        return ''
                    }
                }
            }
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
    };

    return (
        <Stack>
            <Stack direction={'row'} my={4}>
                <DimensionSelector 
                    loading={dataLoading}
                    value={dimension}
                    label={'Select Dimension'}
                    onChange={(e: any) => handleDimensionChange(e)}
                    options={DIMENSIONS}
                />
                <PeriodSelector 
                    loading={dataLoading}
                    value={analyticsPeriod}
                    label={'Select Periods'}
                    onChange={(e: any) => handleAnalyticsPeriodChange(e)}
                    options={ANALYTICS_PERIODS}
                    dates={analyticsDates}
                    analytics
                />
                <DeviceSelector />
            </Stack>
            <Stack alignItems={'center'}>
                <AnalyticsChart data={data} options={options}/>
            </Stack>
        </Stack>
    )
};

export default Analytics;