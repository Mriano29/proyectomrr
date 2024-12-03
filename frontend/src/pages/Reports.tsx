import { Button, Toolbar, Tooltip } from "@mui/material";
import Menu from "../components/Menu";
import { useState } from "react";
import Informe from "../components/InformeColeccion";
import InformeUsuarios from "../components/InformeUsuarios";

export default function Reports() {
    const [dataButtonPressed, setDataButtonPressed] = useState(false);
    const [usersButtonPressed, setUsersButtonPressed] = useState(false);
    const [data, setData] = useState<itemType[]>([])
    const [users, setUsers] = useState<userType[]>([])
    interface itemType {
        id?: number
        nombre: string
        marca: string
        tipo: string
        precio: number
    }

    interface userType {
        id?: number
        nombre: string
        login: string
        password: string
        rol: string
    }

    async function handleData() {
        fetch(`http://localhost:3030/getItems`)
            .then(response => response.json())
            .then(response => {
                setData(response.data)
                setUsersButtonPressed(false)
                setDataButtonPressed(true)
            })
    }

    async function handleUsers() {
        fetch(`http://localhost:3030/getUsers`)
            .then(response => response.json())
            .then(response => {
                setUsers(response.data)
                setDataButtonPressed(false)
                setUsersButtonPressed(true)
            })
    }

    return (
        <>
            <Menu nombre="Reports" />
            <Toolbar />
            <Tooltip title="Obtener tabla de informes">
                <Button variant="contained" onClick={handleData} sx={{ margin: 5 }}>
                    Informe colección
                </Button>
            </Tooltip>
            <Tooltip title="Obtener tabla de informes">
                <Button variant="contained" onClick={handleUsers} sx={{ margin: 5 }}>
                    Informe Usuarios
                </Button>
            </Tooltip>
            {dataButtonPressed ? <Informe data={data} /> :
                usersButtonPressed ? <InformeUsuarios data={users} />
                    :
                    null}
        </>
    )
}