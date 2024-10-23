import { Typography } from "@mui/material"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
export default function Login(){
    return(
        <>
            <Container role="main">
                <Grid>
                    <Typography variant="h1" color="primary">
                        Página de Login de Miguel Riaño Rojas
                    </Typography>
                    <Typography variant="h2" color="secondary">
                        Este es el segundo texto de mi página de Login
                    </Typography>
                    <Typography variant="h3" color="success">
                        A la tercera H va la vencida
                    </Typography>
                    <Typography variant="subtitle1" color="warning">
                        Este es el primer subtitulo de mi página de Login
                    </Typography>
                    <Typography variant="body1" color="error">
                        Este es el cuerpo de la página de login
                    </Typography>
                    <Typography variant="caption" color="info">
                        Que maravilla este caption
                    </Typography>
                </Grid>
            <Grid container justifyContent={'center'}>
                <Button variant="contained">Boton contenido</Button>
                <Button variant="text">Boton de texto</Button>
                <Button variant="outlined">Boton contorno</Button>
            </Grid>
            </Container>
        </>
    )
}