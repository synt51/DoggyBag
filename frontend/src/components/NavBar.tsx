import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    Avatar, Menu, MenuItem, Tooltip
} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {useNavigate} from "react-router-dom";
import './NavBar.scss';
import React, {useContext} from "react";
import {AuthContext} from "../context/AuthProvider";
import {grey, orange} from "@mui/material/colors";

export default function NavBar() {

    const navigate = useNavigate()

    const {setJwt} = useContext(AuthContext)

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
        setJwt("")
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

    const goToProfile = () => {
        navigate('/profile')
        handleCloseUserMenu()
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
            <AppBar className="appBar" position="sticky" style={{backgroundColor: "orange", color: "white"}}>
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
                                <Avatar className="avatar" sx={{bgcolor:grey[50], color: orange[500]}}/>
                            </IconButton>
                        </Tooltip>
                        {localStorage.getItem('Token') ?
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
                                <MenuItem onClick={goToProfile}>
                                    <PersonIcon/>
                                    <Typography textAlign="center">Profile</Typography>
                                </MenuItem>
                                <MenuItem>
                                    <SettingsIcon/>
                                    <Typography textAlign="center">Settings</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <LogoutIcon/>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                            :
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
                                <MenuItem onClick={goToLogin}>
                                    <LoginIcon/>
                                    <Typography textAlign="center">Login</Typography>
                                </MenuItem>
                                <MenuItem onClick={goToRegister}>
                                    <PersonAddIcon/>
                                    <Typography textAlign="center">Register</Typography>
                                </MenuItem>
                            </Menu>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}