import { Chip, Grid, Link, Typography } from "@mui/material"
import { DataGrid, GridRenderCellParams, GridColDef} from "@mui/x-data-grid"
import { ShopLayout } from "../../components/layouts"
import NextLink from 'next/link';


const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'fullname', headerName: 'Full Name', width: 300},
    {
        field: 'paid',
        headerName: 'Paid',
        description: 'Shows info if the order is paid or not',
        width: 200,
        renderCell: ( params: GridRenderCellParams) => {
            return (
                params.row.paid
                    ? <Chip color='success' label='Paid' variant='outlined' />
                    : <Chip color='error' label='Not Paid' variant='outlined' />
            )
        }
    },
    {
        field: 'order',
        headerName: 'Order',
        description: 'Go to Order',
        sortable: false,
        width: 200,
        renderCell: ( params: GridRenderCellParams) => {
            return (
                <NextLink href={`/orders/${params.row.order}`} passHref >
                    <Link underline="hover">See order</Link>
                </NextLink>
            )
        }
    }
]

const rows = [
    {id: 1, paid: true, fullname:'Eduardo Rios', order:'asdf1324'},
    {id: 2, paid: false, fullname:'Gerardo Rios', order:'asdf1324'},
    {id: 3, paid: false, fullname:'Juan Perez', order:'asdf1324'},
]

const HistoryPage = () => {
    return (
        <ShopLayout title="Order History" pageDescription="Client order history">
            <Typography variant="h1" component={'h1'}>Order History</Typography>
            <Grid container>
                <Grid item xs={12} sx={{height:650, width:'100%'}}>
                    <DataGrid 
                        rows={rows} 
                        columns={columns} 
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
        </ShopLayout>

    )

}

export default HistoryPage