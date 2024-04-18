export const DEVICE_TYPES = {
    'security-device': 'Security Device',
    'climate-control-device': 'Climate Control Device',
    'lighting-device': 'Lighting Device',
    'appliance-control-device': 'Appliance Control Device'
}

export const CURRENT_PERIODS = {
    'today': 'Today',
    'this_week': 'This Week',
    'this_month': 'This Month',
    'this_year': 'This Year',
}

export const COMPARISON_PERIODS = {
    'yesterday': 'Yesterday',
    'last_week': 'Last Week',
    'last_month': 'Last Month',
    'last_year': 'Last Year',
}

export const ANALYTICS_PERIODS = {
    'today_vs_yesterday': { currentPeriod: 'today', comparisonPeriod: 'yesterday', label : 'Today vs. Yesterday'},
    'this_week_vs_last_week': { currentPeriod: 'this_week', comparisonPeriod: 'last_week', label : 'This Week vs. Last Week'},
    'this_month_vs_last_month': { currentPeriod: 'this_month', comparisonPeriod: 'last_month', label : 'This Month vs. Last Month'},
    'this_year_vs_last_year': { currentPeriod: 'this_year', comparisonPeriod: 'last_year', label : 'This Year vs. Last Year'},
}

export const DIMENSIONS = {
    electricData: 'Electrical Consumptions (kW)',
    usageData: 'Usage (Hr)'
}