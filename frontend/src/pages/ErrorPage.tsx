import { Typography } from "@mui/material";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage(){
    const error = useRouteError();
    console.log(error)
    const status = isRouteErrorResponse(error) ? error.status : null;
    const statusText = isRouteErrorResponse(error) ? error.statusText : "Unknown Error";
    const errorMessage = isRouteErrorResponse(error) && typeof error.data === "string" ? error.data : "An unexpected error occurred.";
    return(
        <>
            <Typography variant="h1" color="primary">
                Vaya... Parece que te has equivocado
            </Typography>
            <Typography variant="caption" color="secondary">
                A lo mejor deberias revisar la ruta
            </Typography>
            <Typography variant="body1" color="error">
                {errorMessage}
            </Typography>
            <Typography variant="body1" color="error">
                {status}:{statusText}
            </Typography>
        </>
    )
}