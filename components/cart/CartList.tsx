import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { CartContext } from '../../context/cart';
import { ItemCounter } from '../ui';
import { ICartProduct } from '../../interfaces';
import { currency } from '../../utils';


interface Props {
    editable?: boolean;
}

export const CartList:FC<Props> = ({editable = false}) => {
    const {cart, updateCartQuantity, deleteProductFromCart} = useContext(CartContext);
    const onUpdateQuantity = (newValue: number, product:ICartProduct) => {
        product.quantity = newValue;
        updateCartQuantity(product);
    };
    const onDeleteProduct= (product:ICartProduct) => {
        deleteProductFromCart(product);
    }
    return (
        <>
            {
                cart.map( product => (
                    <Grid container spacing={2} key={product.slug + product.size} sx={{mb:1}}>
                        <Grid item xs={3}>
                            <NextLink href={`product/${product.slug}`} passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia 
                                            image={`/products/${product.image}`}
                                            component='img'
                                            sx={{borderRadius: '5px'}}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display={'flex'} flexDirection='column'>
                                <Typography variant='body1'>{product.title}</Typography>
                                <Typography variant='body1'>Size: <strong>M</strong></Typography>
                                {
                                    editable 
                                    ? 
                                    <ItemCounter 
                                        currentValue={product.quantity} 
                                        maxValue={10} 
                                        updateQuantity={(value:number) => {
                                            onUpdateQuantity(value, product);
                                        }} 
                                    />
                                    : <Typography variant='h5'>{product.quantity} {product.quantity > 1 ? 'products' : 'product'}</Typography>
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems={'center'} flexDirection='column'>
                            <Typography variant='subtitle1'>{currency.format(product.price)}</Typography>
                            {
                                editable && (
                                    <Button variant='text' color='secondary' onClick={() => onDeleteProduct(product)}>
                                        Delete
                                    </Button>
                                )
                            }
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}