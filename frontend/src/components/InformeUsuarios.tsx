import MaterialTable, { Column } from "@material-table/core"
import { ExportCsv, ExportPdf } from "@material-table/exporters"
import { useTheme } from "@mui/material/styles"

interface userType {
    id?: number
    nombre: string
    login: string
    password: string
    rol: string
}

interface informeProps {
    data: userType[]
}

export default function InformeColeccion({ data }: informeProps) {
    const reportData = data
    const theme = useTheme();

    const users: Array<Column<userType>> = [
        { title: "Nombre", field: "nombre", filtering: true },
        { title: "Usuario", field: "login", filtering: false },
        { title: "Contraseña", field: "password", filtering: false },
        { title: "Rol", field: "rol", filtering: false }
    ]

    const datosTabla = reportData.map((user) => ({
        id: user.id,
        nombre: user.nombre,
        login: user.login,
        password: user.password,
        rol: user.rol,
    }));

    return (
        <>
            <MaterialTable title={"Colección de usuarios"} columns={users} data={datosTabla} options={{
                exportMenu: [
                    { label: "Exportar a PDF", exportFunc: (users, datosTabla) => ExportPdf(users, datosTabla, "Coleccion usuarios PDF") },
                    { label: "Exportar a CSV", exportFunc: (users, datosTabla) => ExportCsv(users, datosTabla, "Coleccion usuarios CSV") }
                ],
                columnsButton: true,
                filtering: true,
                headerStyle: {
                    color: theme.palette.primary.main,
                }
            }}
            />
        </>
    )
}