import { Grid, Typography } from "@mui/material"
import { useContext } from 'react';
import { CartContext } from "../../context/cart";
import { currency } from "../../utils";


export const OrderSummary = () => {
    const {numberOfItems, subtotal, taxes, total} = useContext(CartContext)
    
    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>Product Number</Typography>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent='end'>
                <Typography>{numberOfItems} {numberOfItems> 1 ? 'items': 'item'}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>Subtotal</Typography>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent='end'>
                <Typography>{currency.format(subtotal)}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>Taxes ({Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)*100})%</Typography>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent='end'>
                <Typography>{currency.format(taxes)}</Typography>
            </Grid>
            <Grid item xs={6} sx={{mt:2}}>
                <Typography variant="subtitle1">Total</Typography>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent='end' sx={{mt:2}}>
                <Typography variant="subtitle1">{currency.format(total)}</Typography>
            </Grid>
        </Grid>
    )
}