import { Box, Paper, Skeleton, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import useStore from '../stores';

const Notifications = () => {

    const { notificationsLoading, getNotifications, notifications } = useStore();

    useEffect(() => {
        getNotifications();
    }, [])

    const NotificationView = ({ date, content }: any) => {
        return (
            <Paper key={date} sx={{ p: 2 }}>
                { notificationsLoading ?
                    <Skeleton height={150} sx={{ mt: -4.3, mb: -3.5 }}></Skeleton>
                    :
                    <Stack>
                        <Typography>
                            { content }
                        </Typography>
                        <Typography variant={'subtitle2'} color={'text.secondary'} alignSelf={'end'}>
                            { date }
                        </Typography>
                    </Stack>
                }
            </Paper>
        )
    }

    return (
        <Box m={4}>
            {notifications.length ? 
                <Stack spacing={3}>
                    {notifications.map((notification: any) => (
                        NotificationView({ date: notification.date, content: notification.content })
                    ))}
                </Stack>
                :
                <Typography>
                    There is no notification to display.
                </Typography>
            }
        </Box>
    )
};

export default Notifications;