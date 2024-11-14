import Menu from "../components/Menu";
import Dashboard from "../components/Dashboard";
import { Toolbar } from "@mui/material";
export default function Home(){
    
    return(
        <>
            <Menu nombre={'Home'}/>
            <Toolbar/>
            <Dashboard/>
        </>
    )
}
