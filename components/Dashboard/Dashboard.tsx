import { Card, CardContent, Divider, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useStore from '../../stores';
import { filteredAggregateData, getPeriodDates } from "@/utils/data-utils";
import PeriodSelector from "./PeriodSelector";
import { COMPARISON_PERIODS, CURRENT_PERIODS } from "@/utils/constants";
import DeviceSelector from "./DeviceSelector";

interface cardProps {
    loading: boolean,
    label: string,
    unit: string,
    thisPeriodData: any,
    lastPeriodData: any
}

const Dashboard = () => {

    const { 
        electricConsumptionDataLoading, 
        electricConsumptionData, 
        getElectricConsumptionData,
        usageDataLoading,
        usageData,
        getUsageData,
        currentPeriod,
        setCurrentPeriod,
        currentDates,
        setCurrentDates,
        comparisonPeriod,
        setComparisonPeriod,
        comparisonDates,
        setComparisonDates,
        devices } = useStore();

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
            electricData: filteredAggregateData({
                data: electricConsumptionData, startDate: currentDates.startDate, endDate: currentDates.endDate, deviceIds: devices }),
            usageData: filteredAggregateData({
                data: usageData, startDate: currentDates.startDate, endDate: currentDates.endDate, deviceIds: devices })
        }
    }

    const getComparisonPeriodData = () => {
        return {
            electricData: filteredAggregateData({
                data: electricConsumptionData, startDate: comparisonDates.startDate, endDate: comparisonDates.endDate, deviceIds: devices }),
            usageData: filteredAggregateData({
                data: usageData, startDate: comparisonDates.startDate, endDate: comparisonDates.endDate, deviceIds: devices })
        }
    }

    const handleCurrentPeriodChange = (e: any) => {
        setCurrentPeriod(e.target.value);
        setCurrentDates(getPeriodDates(e.target.value));
    }
    
    const handleComparisonPeriodChange = (e: any) => {
        setComparisonPeriod(e.target.value);
        setComparisonDates(getPeriodDates(e.target.value));
    }

    const [currentData, setCurrentData] = useState(getCurrentPeriodData());
    const [comparisonData, setComparisonData] = useState(getComparisonPeriodData());

    useEffect(() => {
        setCurrentData(getCurrentPeriodData());
        setComparisonData(getComparisonPeriodData());
    }, [dataLoading, currentDates, comparisonDates, devices])

    const card = ({loading, label, unit, thisPeriodData, lastPeriodData}: cardProps) => {
        return (
            <Card variant="elevation" sx={{ width: '27vw', mt: 3, mx: '3vw', boxShadow: 10 }} >
                {loading ? 
                        <Skeleton height={400} sx={{ mt: -12, mb: -10 }}></Skeleton>
                    :
                        <CardContent sx={{ p: 2 }}>
                            <Typography variant={'h5'} fontSize={28}>
                                { label }
                            </Typography>
                            <Divider sx={{ my: 1.5 }} />
                            <Stack direction={'column'} spacing={0.5} mx={3}>
                                <Stack>
                                    <Typography variant={'h5'}>
                                        This period
                                    </Typography>
                                    <Typography variant={'h6'}>
                                        { `${thisPeriodData} ${unit}` }
                                    </Typography>
                                </Stack>
                                <Stack alignItems={'end'} >
                                    <Typography variant={'h6'} color={'text.secondary'}>
                                        Last Period
                                    </Typography>
                                    <Typography variant={'subtitle1'} color={'text.secondary'}>
                                        { `${lastPeriodData} ${unit}` }
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                }
            </Card>
        )
    }
    
    return (
        <Stack>
            <Stack direction={'row'} mt={4}>
                <PeriodSelector 
                    loading={dataLoading}
                    value={currentPeriod}
                    label={'Select Current Period'}
                    onChange={(e: any) => handleCurrentPeriodChange(e)}
                    options={CURRENT_PERIODS}
                    dates={currentDates}
                />
                <PeriodSelector 
                    loading={dataLoading}
                    value={comparisonPeriod}
                    label={'Select Comparison Period'}
                    onChange={(e: any) => handleComparisonPeriodChange(e)}
                    options={COMPARISON_PERIODS}
                    dates={comparisonDates}
                />
                <DeviceSelector />
            </Stack>
            <Stack direction={'row'} mt={2}>
                { card({
                    loading: electricConsumptionDataLoading, 
                    label: 'Total Electric Consumption',
                    unit: 'kW',
                    thisPeriodData: currentData.electricData.total,
                    lastPeriodData: comparisonData.electricData.total }) 
                }
                { card({
                    loading: electricConsumptionDataLoading, 
                    label: 'Avg. Daily Electric Consum...', 
                    unit: 'kW',
                    thisPeriodData: currentData.electricData.avgDaily,
                    lastPeriodData: comparisonData.electricData.avgDaily }) 
                }
                { card({
                    loading: electricConsumptionDataLoading, 
                    label: 'Peak Electric Consumption',
                    unit: 'kW', 
                    thisPeriodData: currentData.electricData.peak,
                    lastPeriodData: comparisonData.electricData.peak }) 
                }
            </Stack>
            <Stack direction={'row'}>
                { card({
                    loading: usageDataLoading, 
                    label: 'Total Usage',
                    unit: 'Hr', 
                    thisPeriodData: currentData.usageData.total,
                    lastPeriodData: comparisonData.usageData.total }) 
                }
                { card({
                    loading: usageDataLoading, 
                    label: 'Avg. Daily Usage',
                    unit: 'Hr', 
                    thisPeriodData: currentData.usageData.avgDaily,
                    lastPeriodData: comparisonData.usageData.avgDaily }) 
                }
                { card({
                    loading: usageDataLoading, 
                    label: 'Peak Usage',
                    unit: 'Hr', 
                    thisPeriodData: currentData.usageData.peak,
                    lastPeriodData: comparisonData.usageData.peak }) 
                }
            </Stack>
        </Stack>
    )
}

export default Dashboard;