import * as React from 'react';
import router from 'next/router';
import useStore from '../../stores';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';

const NavigationBar = () => {
    const { logoutUser, userData } = useStore();
    const { name } = userData;
    const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

    const pages = [        
        {
            label: 'Home',
            onClick: () => router.push('/')
        },
        {
            label: 'Devices',
            onClick: () => router.push('/devices')
        },
        {
            label: 'Analytics',
            onClick: () => router.push('/analytics')
        },
        {
            label: 'Notifications',
            onClick: () => router.push('/notifications')
        }
    ];
    const settings = [
        {
            label: 'Profile',
            onClick: () => router.push('/profile')
        },
        {
            label: 'Logout',
            onClick: () => logoutUser()
        }
    ];

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ height: '9vh', minHeight: '70px' }}>
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <Button onClick={() => router.push('/')} color="primary">
                        <Image src={`${prefix}/logo.png`} alt='logo' width={50} height={50} />
                    </Button>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.label}
                                onClick={() => page.onClick() }
                                sx={{ my: 2, mx: 1, color: 'white', display: 'block', fontSize: '18px', textTransform: 'none' }}
                            >
                                {page.label}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt={name} src="/" />
                        </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                        {settings.map((setting) => (
                            <MenuItem key={setting.label} onClick={() => { handleCloseUserMenu(); setting.onClick(); }}>
                                <Typography variant={'subtitle1'} textAlign="center">{setting.label}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavigationBar;