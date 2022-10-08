import NextLink from 'next/link';
import { Typography, Grid, Card, CardContent, Divider, Box, Link, Chip } from "@mui/material"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';


const OrderPage = () => {
    return (
        <ShopLayout title="Order Summary 2456246" pageDescription="Order summary">
            <Typography variant="h1" component={'h1'}>Order: asd123</Typography>
            {/* <Chip 
                sx={{my:2}} 
                label='Pending payment'
                variant='outlined'
                color='error'
                icon={<CreditCardOffOutlined/>}
            /> */}
            <Chip 
                sx={{my:2}} 
                label='Paid'
                variant='outlined'
                color='success'
                icon={<CreditScoreOutlined/>}
            />
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Sumary (3 products)</Typography>
                            <Divider sx={{my:1}} />
                            <Box display={'flex'} justifyContent='space-between'>
                            <Typography variant="subtitle1">Delivery Address</Typography>
                                <NextLink href={'/checkout/address'} passHref>
                                    <Link underline="always">
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>
                            <Typography>Juan</Typography>
                            <Typography>Nepean</Typography>
                            <Typography>Nepean</Typography>
                            <Typography>Canada</Typography>
                            <Typography>13414352435</Typography>
                            <Divider sx={{my:1}} />
                            <Box display={'flex'} justifyContent='end'>
                                <NextLink href={'/cart'} passHref>
                                    <Link underline="always">
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>
                            <OrderSummary />
                            <Box sx={{ mt: 3}}>
                                <h1>
                                    Pay
                                </h1>
                            </Box>
                            <Chip 
                                sx={{my:2}} 
                                label='Paid'
                                variant='outlined'
                                color='success'
                                icon={<CreditScoreOutlined/>}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default OrderPage