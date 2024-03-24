import * as React from 'react';
import router from 'next/router';
import useStore from '../../stores';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';

const NavigationBar = () => {
    const { logoutUser, userData } = useStore();
    const { name } = userData;

    const pages = [        {
            label: 'Home',
            onClick: () => router.push('/')
        },
        {
            label: 'About',
            onClick: () => router.push('/')
        }];

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
        <AppBar position="static" sx={{ height: '9vh' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        onClick={() => router.push('/')}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                        <Button
                            key={page.label}
                            onClick={() => page.onClick() }
                            sx={{ my: 2, color: 'white', display: 'block' }}
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
                                <Typography textAlign="center">{setting.label}</Typography>
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