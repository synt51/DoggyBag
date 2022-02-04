import {AppBar, Box, Toolbar, Typography, Button, IconButton} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";

export default function NavBar() {


    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <img src="../doggyBagLogo.svg" className="logo" />
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        DoggyBag
                    </Typography>
                    <Link to="/login">
                        <Button color="inherit">Login</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}