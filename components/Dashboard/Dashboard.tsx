import { Button, Card, CardActions, CardContent, Divider, Stack, Typography } from "@mui/material";

const Dashboard = () => {
    const card = () => {
        return (
            <Card variant="elevation" sx={{ width: '25vw', mt: 5, mx: '5vw', boxShadow: 10 }} >
                <CardContent sx={{ p: 3 }}>
                    <Typography variant={'h4'}>
                        Usage Duration
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction={'column'} spacing={1} mx={3}>
                        <Stack>
                            <Typography variant={'h5'}>
                                This Week
                            </Typography>
                            <Typography variant={'h6'}  sx={{ mb: 1 }}>
                                adjective
                            </Typography>
                        </Stack>
                        <Stack alignItems={'end'} >
                            <Typography variant={'h6'} color={'text.secondary'}>
                                This Week
                            </Typography>
                            <Typography variant={'subtitle1'}  sx={{ mb: 1 }} color={'text.secondary'}>
                                adjective
                            </Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        )
    }
    
    return (
        <>
            <Stack>
                <Stack direction={'row'}>
                    { card() }
                    { card() }
                    { card() }
                </Stack>
                <Stack direction={'row'}>
                    { card() }
                    { card() }
                    { card() }
                </Stack>
            </Stack>
        </>
    )
}

export default Dashboard;