import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Tooltip } from "@mui/material"
import Menu from "../components/Menu"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid2"
import { useEffect, useState } from "react"
export default function GestionUsuarios() {
    const [inicio, setInicio] = useState(true);
    const [tableData, setTableData] = useState<userType[]>([])
        /**
     * Cargado de datos
     */
        useEffect(() => {
            if (inicio) {
                getData();
                setInicio(false)
            }
        }, [inicio]);

        async function getData() {
            fetch(`http://localhost:3030/getUsers`)
                .then(response => response.json())
                .then(response => {
                    setTableData(response.data)
                })
        }

    interface userType {
        id?: number
        nombre: string
        login: string
        password: string
        rol: string
    }
    const userInitialState: userType = {
        nombre: '',
        login: '',
        password: '',
        rol: ''
    }

    const [user, setUser] = useState(userInitialState)

    async function handleInsertUsuario(e: any) {
        e.preventDefault()
        fetch(`http://localhost:3030/addUser?nombre=${user.nombre}&login=${user.login}&password=${user.password}&rol=${user.rol}`)
            .then(response => response.json())
            .then(response => {
                if (response === 1) {
                    alert('Usuario insertado')
                    vaciarCampos()
                    setInicio(true)
                }
            })
    }

    function vaciarCampos() {
        setUser(userInitialState)
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            nombre: e.target.value
        })
    }
    const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            login: e.target.value
        })
    }
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            password: e.target.value
        })
    }
    const handleChangeRole = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            rol: e.target.value
        })
    }
    return (
        <>
            <Menu nombre={'Gestión de usuarios'} />
            <Toolbar />
            <Paper elevation={10} sx={{ padding: 2, margin: 2 }} square={false}>
                <Box component='form' onSubmit={handleInsertUsuario}>
                    <Grid container alignContent={'center'} justifyContent={'center'} marginTop={2} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 5.5 }}>
                        <Grid>
                            <TextField required label='Nombre' onChange={handleChangeName} value={user.nombre} />
                        </Grid>
                        <Grid>
                            <TextField required label='Usuario' onChange={handleChangeLogin} value={user.login} />
                        </Grid>
                        <Grid>
                            <TextField required label='Contraseña' type="password" onChange={handleChangePassword} value={user.password} />
                        </Grid>
                        <Grid>
                            <TextField required label='Rol' onChange={handleChangeRole} value={user.rol} />
                        </Grid>
                        <Tooltip title="Insertar usuario">
                            <Button variant='contained' type='submit'>
                                Insertar usuario
                            </Button>
                        </Tooltip>
                    </Grid>
                </Box>
            </Paper>
            <Paper elevation={10} sx={{ padding: 2, margin:2  }} square={false}>
                <Grid container direction={'column'} spacing={2} sx={{ marginTop: { xs: '10px' } }} >
                    <Grid sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                        <TableContainer >
                            <Table aria-label='Tabla de Usuarios'>
                                <TableHead>
                                    <TableRow>
                                    <TableCell >ID</TableCell>
                                        <TableCell >Nombre</TableCell>
                                        <TableCell>Usuario</TableCell>
                                        <TableCell>Contraseña</TableCell>
                                        <TableCell>Rol</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((row: userType) => (
                                        <TableRow key={row.id}>
                                              <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.nombre}</TableCell>
                                            <TableCell>{row.login}</TableCell>
                                            <TableCell>{row.password}</TableCell>
                                            <TableCell>{row.rol}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}