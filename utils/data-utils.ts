import dayjs from "dayjs";

interface dataProps {
    [date: string]: {
      [deviceId: string]: number;
    };
  }

interface filteredAggregateDataProps {
    data: dataProps,
    startDate: string,
    endDate: string,
    deviceIds?: string[],
}

export const filteredAggregateData = ({data={}, startDate, endDate, deviceIds=[]}: filteredAggregateDataProps) => {
    let totalConsumption = 0;
    let totalDays = 0;
    let consumptionValues: number[] = [];

    if(data) {
        Object.keys(data).length && Object.entries(data).forEach(([date, consumptionByDevice]) => {
            // Check if the date is within the specified range
            if (date >= startDate && date <= endDate) {
                totalDays++; // Increment total days within range
                // Iterate over consumption data for each device on the date
                Object.entries(consumptionByDevice).forEach(([deviceId, consumption]:[string, number]) => {
                    // Check if the device ID matches or no specific IDs are provided
                    if (deviceIds.length === 0 || deviceIds.includes(deviceId)) {
                        // Add consumption to the total
                        totalConsumption += consumption;
                        consumptionValues.push(consumption);
                    }
                });
            }
        });
    }

    // Calculate average daily consumption
    const averageDaily = totalDays > 0 ? totalConsumption / totalDays : 0;

    // Calculate peak consumption
    const peakConsumption = consumptionValues.length ? Math.max(...consumptionValues) : 0;

    return {
        total: totalConsumption.toFixed(2),
        avgDaily: averageDaily.toFixed(2),
        peak: peakConsumption.toFixed(2)
    }
}

export const filteredAggregateDataByDate = ({data={}, startDate, endDate, deviceIds=[]}: filteredAggregateDataProps) => {
    let dates: string[] = [];
    let aggregateData: number[] = []

    if(data) {
        Object.keys(data).length && Object.entries(data).forEach(([date, consumptionByDevice]) => {
            // Check if the date is within the specified range
            if (dayjs(date) >= dayjs(startDate) && dayjs(date) <= dayjs(endDate)) {
                let totalConsumption = 0;
                // Iterate over consumption data for each device on the date
                Object.entries(consumptionByDevice).forEach(([deviceId, consumption]:[string, number]) => {
                    // Check if the device ID matches or no specific IDs are provided
                    if (deviceIds.length === 0 || deviceIds.includes(deviceId)) {
                        // Add consumption to the total
                        totalConsumption += consumption;
                    }
                });
                dates.push(date)
                aggregateData.push(totalConsumption) ;
            }
        });
    }

    return {
        dates: dates,
        aggregateData: aggregateData
    };
};

export const getPeriodDates = (period: string) => {
    switch (period) {
        case 'today':
            return {
                startDate: dayjs().format('MM-DD-YYYY'),
                endDate: dayjs().format('MM-DD-YYYY'),
            }
        case 'this_week':
            return {
                startDate: dayjs().startOf('week').format('MM-DD-YYYY'),
                endDate: dayjs().format('MM-DD-YYYY'),
            }
        case 'this_month':
            return {
                startDate: dayjs().startOf('month').format('MM-DD-YYYY'),
                endDate: dayjs().format('MM-DD-YYYY'),
        }
        case 'this_year':
            return {
                startDate: dayjs().startOf('year').format('MM-DD-YYYY'),
                endDate: dayjs().format('MM-DD-YYYY'),
            }
        case 'yesterday':
            return {
                startDate: dayjs().subtract(1, 'day').format('MM-DD-YYYY'),
                endDate: dayjs().subtract(1, 'day').format('MM-DD-YYYY'),
            }
        case 'last_week':
            return {
                startDate: dayjs().subtract(1, 'week').startOf('week').format('MM-DD-YYYY'),
                endDate: dayjs().subtract(1, 'week').endOf('week').format('MM-DD-YYYY'),
            }
        case 'last_month':
            return {
                startDate: dayjs().subtract(1, 'month').startOf('month').format('MM-DD-YYYY'),
                endDate: dayjs().subtract(1, 'month').endOf('month').format('MM-DD-YYYY'),
            }
        case 'last_year':
            return {
                startDate: dayjs().subtract(1, 'year').startOf('year').format('MM-DD-YYYY'),
                endDate: dayjs().subtract(1, 'year').endOf('year').format('MM-DD-YYYY'),
            }
        default:
            return {
                startDate: dayjs().format('MM-DD-YYYY'),
                endDate: dayjs().format('MM-DD-YYYY'),
            }
    }
}