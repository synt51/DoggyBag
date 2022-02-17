import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    Avatar, Menu, MenuItem, Tooltip
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from "react-router-dom";
import './NavBar.scss';
import React from "react";

export default function NavBar() {

    const navigate = useNavigate()

    const goToLogin = () => {
        navigate('/login')
        handleCloseUserMenu()
    }

    const goToRegister = () => {
        navigate('/registration')
        handleCloseUserMenu()
    }

    const handleLogout = () => {
        handleCloseUserMenu()
        localStorage.clear()
        window.location.reload()
        navigate('/')
    }

    const goToGettingBags = () => {
        navigate('/')
        handleCloseNavMenu()
    }
    const goToFinestRoutes = () => {
        navigate('/finestroutes')
        handleCloseNavMenu()
    }
    const goToMedDog = () => {
        navigate('/meddog')
        handleCloseNavMenu()
    }

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar className="appBar" position="static" color="transparent">
                <Toolbar>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick={handleOpenNavMenu}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            <MenuItem onClick={goToGettingBags}>
                                <Typography textAlign="center">Getting bags</Typography>
                            </MenuItem>
                            <MenuItem onClick={goToFinestRoutes}>
                                <Typography textAlign="center">Finest Routes</Typography>
                            </MenuItem>
                            <MenuItem onClick={goToMedDog}>
                                <Typography textAlign="center">Med Dog</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        DoggyBag
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <MenuItem onClick={goToGettingBags}>
                            <Typography textAlign="center">Getting bags</Typography>
                        </MenuItem>
                        <MenuItem onClick={goToFinestRoutes}>
                            <Typography textAlign="center">Finest Routes</Typography>
                        </MenuItem>
                        <MenuItem onClick={goToMedDog}>
                            <Typography textAlign="center">Med Dog</Typography>
                        </MenuItem>
                    </Box>
                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar className="avatar"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
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
                            {localStorage.getItem('Token') ?
                                <>
                                    <MenuItem>
                                        <Typography textAlign="center">Profile</Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <Typography textAlign="center">Settings</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </>
                                :
                                <>
                                    <MenuItem onClick={goToLogin}>
                                        <Typography textAlign="center">Login</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={goToRegister}>
                                        <Typography textAlign="center">Register</Typography>
                                    </MenuItem>
                                </>
                            }
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}