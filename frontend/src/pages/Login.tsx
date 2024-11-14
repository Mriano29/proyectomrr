import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import  Grid from "@mui/material/Grid2";
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import LockIcon from '@mui/icons-material/Lock';
import { useState } from "react";
import * as React from 'react';
import Alert from '@mui/material/Alert';
//Importamos el useDispatch del react-redux
import { useDispatch} from 'react-redux'
//Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../store/authSlice';


export default function Login(){

    const [data, setData] = useState({user:'', password:'', showAlert: false, alertSuccess: false});

    const navigate = useNavigate()

    const dispatch = useDispatch()

    async function isVerifiedUser () {
        fetch(`http://localhost:3030/login?user=${data.user}&password=${data.password}`)
        .then(response => response.json())
        .then (response => {
        console.log('Lo que nos llega de la base de datos: ')
        console.log(response.data)
        if (response.data.length !== 0){
       handleAlertSuccess();
        } else{
       handleAlertError();
        }
       })
       }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Usuario: " + data.user);
        console.log("Contraseña: " + data.password)
        isVerifiedUser();
     }

     const handleAlertError = () =>{
        setData({
            ...data,
             showAlert: true,
             alertSuccess: false
        })
    }

     const handleAlertSuccess = () =>{
        setData({
            ...data,
             showAlert: true,
             alertSuccess: true
        })
        dispatch(authActions.login({
            name: data.user,
            rol: 'administrador'
        }))
        navigate('/Home');
    }

     const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setData({
            ...data,
            user: e.target.value
        })
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setData({
            ...data,
            password: e.target.value
        })
    }

    return(
        <>
            <Paper elevation={12} square={false} sx={{padding: 2}}>
                <Box component = 'form' onSubmit={handleSubmit}>
                    <Grid container direction={'column'} spacing={2}>
                        <Grid>
                            <Typography fontFamily={"consolas"} color="primary">
                                    Sistema de Acceso
                            </Typography>
                            <LockIcon color="secondary"/>
                        </Grid>
                         <Grid>
                            <TextField required label='Usuario' variant='outlined' fullWidth onChange={handleChangeUser}/>
                        </Grid>
                        <Grid>
                            <TextField required type="password" label='Contraseña' variant='outlined' fullWidth onChange={handleChangePassword}/>
                        </Grid>
                        <Grid>
                            <Button variant='contained' fullWidth type='submit'>Acceder</Button>
                        </Grid>
                        <Grid>
                                {data.showAlert === true && data.alertSuccess === true  ? 
                                    <Alert  severity="success">
                                        Acceso concedido
                                    </Alert> 
                                    : data.showAlert === true && data.alertSuccess === false  ?
                                    <Alert  severity="error">
                                        Usuario y/o contraseña incorrectos
                                    </Alert>
                                    :
                                    null
                                }
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </>
    )
}