import { useState } from 'react';
import AppBar  from "@mui/material/AppBar";
import Toolbar  from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid2";
import Typography  from '@mui/material/Typography';
import User from '@mui/icons-material/AccountCircle';
import Drawer from '@mui/material/Drawer';
import HomeIcon from '@mui/icons-material/Home';
import ReportIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import List  from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider  from '@mui/material/Divider';
import HelpIcon from '@mui/icons-material/Info';
import { authActions } from '../store/authSlice';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState} from '../store/index';
import { useEffect } from 'react';

export default function menu({ nombre }: { nombre: string }){
    const[open, setOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userData = useSelector((state: RootState) => state.authenticator)
    const isLogged = userData.isAutenticated

    useEffect(() => {
        if (!isLogged) {
        navigate('/')
        }
        }, [isLogged, navigate])

    const handleDrawer = () =>{
       setOpen(!open)
    }

  
    const handleLogout = () =>{
        dispatch(authActions.logout())
        navigate('/');
    }

    const goHome = () =>{
        navigate('/home');
    }

    const goReport = () =>{
        navigate('/reports');
    }
    const DrawerList =(
        <List>
            <ListItem>
                <IconButton onClick={goHome}>
                    <HomeIcon/>
                    <Typography>
                        Home
                    </Typography>
                </IconButton>    
            </ListItem>
            <Divider/>
            <ListItem>
                <IconButton onClick={goReport}>
                    <ReportIcon />
                    <Typography>
                        Reports
                    </Typography>
                </IconButton>
            </ListItem>
            <Divider/>
            <ListItem>
                <IconButton>
                    <HelpIcon />
                    <Typography>
                        Ayuda
                    </Typography>
                </IconButton>
            </ListItem>
            <Divider/>
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

    return(
        <>
                <Toolbar >
                   <AppBar>
                    <Grid container direction={{xs: 'column', sm:'row'}} spacing={2} padding={2}  alignItems={'center'}>
                            <Grid>
                                <IconButton onClick={handleDrawer} color='primary'>
                                    <MenuIcon/>
                                </IconButton>
                            </Grid>
                            <Grid>
                                <Typography >
                                    {nombre}
                                </Typography>
                            </Grid>
                            <Grid sx={{marginLeft: {xs: '', sm:'auto'}}}>
                                <User/>
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