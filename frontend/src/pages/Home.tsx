import { Typography } from "@mui/material";
//Importamos el useSelector del react-redux
import { useDispatch, useSelector } from 'react-redux'
// Importamos lo que necesitamos para el tipo del selector()
import { RootState} from '../store/index'
import { authActions } from '../store/authSlice';
import { useNavigate } from 'react-router-dom'
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";

export default function Home(){
    //Almacenamos en la variable userData lo que obtenemos del store usando el hook useSelector
    const userData = useSelector((state: RootState) => state.authenticator)
    //Comprobamos por la consola qué obtenemos del store
    console.log(userData)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () =>{
        dispatch(authActions.logout())
        navigate('/');
    }
    
    
    return(
        <>
            <Paper elevation={12} square={false} sx={{padding: 2}}>
                <Grid container direction={'column'} spacing={2}>
                    <Grid>
                        <Typography variant="body2" color="primary" fontFamily={'consolas'}>
                            Home de Miguel Riaño: soy el usuario {userData.userName} y tengo el rol de {userData.userRol} 
                        </Typography>
                    </Grid>
                    <Grid>
                        <Button variant="contained" color="primary" onClick={handleLogout}>
                            Salir
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}
