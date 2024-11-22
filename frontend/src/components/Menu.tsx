import { useState } from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid2";
import Typography from '@mui/material/Typography';
import User from '@mui/icons-material/AccountCircle';
import Admin from '@mui/icons-material/AddModerator';
import Drawer from '@mui/material/Drawer';
import HomeIcon from '@mui/icons-material/Home';
import ReportIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import HelpIcon from '@mui/icons-material/Info';
import { authActions } from '../store/authSlice';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function menu({ nombre }: { nombre: string }) {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userData = useSelector((state: RootState) => state.authenticator)
    const isLogged = userData.isAutenticated
    const user = userData.userName
    const role = userData.userRol

    useEffect(() => {
        if (!isLogged) {
            navigate('/')
        }
    }, [isLogged, navigate])

    const handleDrawer = () => {
        setOpen(!open)
    }

    const handleLogout = () => {
        dispatch(authActions.logout())
        navigate('/');
    }

    const DrawerList = (
        <List>
              <Link to={'/home'} style={{textDecoration: 'none'}}>
            <ListItem>
                <IconButton>
                    <HomeIcon />
                    <Typography>
                        Home
                    </Typography>
                </IconButton>
            </ListItem>
            </Link>
            <Divider />
            {role === 'admin' ?
                <Link to={'/reports'} style={{textDecoration: 'none'}}>
                    <ListItem>
                        <IconButton>
                            <ReportIcon />
                            <Typography>
                                Reports
                            </Typography>
                        </IconButton>
                    </ListItem>
                </Link>
                :
                null}
            <Divider />
            <Link to={''} style={{textDecoration: 'none'}}>
            <ListItem>
                <IconButton>
                    <HelpIcon />
                    <Typography>
                        Ayuda
                    </Typography>
                </IconButton>
            </ListItem>
            </Link>
            <Divider />
            <ListItem>
                <IconButton onClick={handleLogout}>
                    <LogoutIcon />
                    <Typography>
                        Salir
                    </Typography>
                </IconButton>
            </ListItem>
        </List>
    )

    return (
        <>
            <Toolbar >
                <AppBar>
                    <Grid container direction={{ xs: 'column', sm: 'row' }} spacing={2} padding={2} alignItems={'center'}>
                        <Grid>
                            <IconButton onClick={handleDrawer} color='primary'>
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid>
                            <Typography >
                                {nombre}
                            </Typography>
                        </Grid>
                        <Grid sx={{ marginLeft: { xs: '', sm: 'auto', display: 'flex' } }} gap={1}>
                            <Typography>
                                {user}
                            </Typography>
                            {role === 'admin' ? <Admin /> : <User />}
                        </Grid>
                    </Grid>
                </AppBar>
            </Toolbar>
            <Drawer open={open} onClose={handleDrawer}>
                {DrawerList}
            </Drawer>
        </>
    )
}