import MaterialTable, { Column } from "@material-table/core"
import { ExportCsv, ExportPdf } from "@material-table/exporters"
import { useTheme } from "@mui/material/styles"

interface itemType {
    id?: number
    nombre: string
    marca: string
    tipo: string
    precio: number
}

interface informeProps {
    data: itemType[]
}

export default function InformeColeccion({ data }: informeProps) {
    const reportData = data
    const theme = useTheme();

    const items: Array<Column<itemType>> = [
        { title: "Nombre", field: "nombre", filtering: false},
        { title: "Marca", field: "marca", filtering: true },
        { title: "Tipo", field: "tipo", filtering: true  },
        { title: "Precio", field: "precio", type: "numeric", filtering: false }
    ]

    const datosTabla = reportData.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        marca: item.marca,
        tipo: item.tipo,
        precio: item.precio,
    }));

    return (
        <>
            <MaterialTable title={"Colección"} columns={items} data={datosTabla} options={{
                exportMenu: [
                    {label: "Exportar a PDF", exportFunc: (items, datosTabla) => ExportPdf(items, datosTabla, "ColeccionPDF")},
                    {label: "Exportar a CSV", exportFunc: (items, datosTabla) => ExportCsv(items, datosTabla, "ColeccionCSV")}
            ],
            columnsButton: true,
            draggable: true,
            filtering: true,
            headerStyle: {
                color: theme.palette.primary.main,
            }}}      
             renderSummaryRow={({ column, data }) =>
                column.field === "precio"
                  ? {
                      value: data.reduce((agg, row) => agg + row.precio, 0),
                    }
                  : undefined
                }
              />
        </>
    )
}