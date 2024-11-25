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
import { Tooltip } from '@mui/material';

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
             <Tooltip title="Home" placement='right'>
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
             </Tooltip>
            <Divider />
            {role === 'admin' ?
                <Tooltip title="Reports" placement='right'>
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
                </Tooltip>
                :
                null}
            <Divider />
            <Tooltip title="Ayuda" placement='right'>
            <Link to={'/ManualDeAyuda.pdf'} target='_blank' style={{textDecoration: 'none'}}>
            <ListItem>
                <IconButton>
                    <HelpIcon />
                    <Typography>
                        Ayuda
                    </Typography>
                </IconButton>
            </ListItem>
            </Link>
            </Tooltip>
            <Divider />
            <Tooltip title="Cerrar sesión" placement='right'>
            <ListItem>
                <IconButton onClick={handleLogout}>
                    <LogoutIcon />
                    <Typography>
                        Salir
                    </Typography>
                </IconButton>
            </ListItem>
            </Tooltip>
        </List>
    )

    return (
        <>
            <Toolbar >
                <AppBar>
                    <Grid container direction={{ xs: 'column', sm: 'row' }} spacing={2} padding={2} alignItems={'center'}>
                        <Grid>
                           <Tooltip title="Menu">
                           <IconButton onClick={handleDrawer} color='primary'>
                                <MenuIcon />
                            </IconButton>
                           </Tooltip>
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