import { Button, Toolbar } from "@mui/material";
import Menu from "../components/Menu";
import { useState } from "react";
import Informe from "../components/InformeColeccion";

export default function Reports(){
    const [buttonPressed, setButtonPressed] = useState(false); 
    const [data, setData] = useState<itemType[]>([])
    interface itemType {
        id?: number
        nombre: string
        marca: string
        tipo: string
        precio: number
    }

    async function handleData() {
        fetch(`http://localhost:3030/getItems`)
            .then(response => response.json())
            .then(response => {
                setData(response.data)
                setButtonPressed(true)
            })
    }

    return(
        <>
            <Menu nombre="Reports"/>
            <Toolbar/> 
            <Button variant="contained" onClick={handleData} sx={{margin: 5}}>
                Informe colección
            </Button>
            {buttonPressed ? <Informe data={data}/> : null}
        </>
    )
}