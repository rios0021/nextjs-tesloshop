import { useState, useContext } from 'react';

import { NextPage, GetStaticPaths, GetStaticProps} from "next";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";

import { ProductSlideshow, SizeSelector } from "../../components/products";
import { ICartProduct, IProduct, ISize } from "../../interfaces";
import { ShopLayout } from "../../components/layouts"
import { ItemCounter } from "../../components/ui";
import { dbProducts } from "../../database";
import { useRouter } from 'next/router';
import { CartContext } from '../../context/cart';
import { currency } from '../../utils';


interface Props {
    product: IProduct;
}

const ProductPage:NextPage<Props> = ({product}) => {

    // TRADITIONAL FORM BUT NOT SEO FRIENDLY
    // const router = useRouter();
    // const {products:product, isLoading} = useProducts(`/products/${router.query.slug}`)

    // if(isLoading){
    //     return <FullScreenLoading/>
    // }
    // if(!product){
    //     return <h1>non existent</h1>
    // }
    const router = useRouter();
    const {addProductToCart} = useContext(CartContext) 

    const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
        _id: product._id,
        image: product.images[0],
        price: product.price,
        size: undefined,
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        quantity: 1
    });
    const onSizeChange = (size: ISize) => {
        setTempCartProduct( currentProduct =>({
            ...currentProduct,
            size
        }))
    }
    const updateQuantity = (newValue:number) => {
        setTempCartProduct( currentProduct =>({
            ...currentProduct,
            quantity: newValue
        }))
    }

    const onAddProduct = () => {
        addProductToCart(tempCartProduct)
        router.push('/cart');
    }
    
    return (
        <ShopLayout title={product.title} pageDescription={product.description}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                    <ProductSlideshow images={product.images} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Box display={'flex'} flexDirection='column'>
                        {/* Titles */}
                        <Typography variant="h1" component={'h1'}>{product.title}</Typography>
                        <Typography variant="subtitle1" component={'h2'}>{currency.format(product.price)}</Typography>
                        {/* Quantity */}
                        <Box sx={{my:2}}>
                            <Typography variant="subtitle2">Quantity</Typography>
                            <ItemCounter 
                                currentValue={tempCartProduct.quantity}
                                maxValue={product.inStock}
                                updateQuantity ={updateQuantity}
                            />
                            <SizeSelector 
                                sizes={product.sizes} 
                                selectedSize ={tempCartProduct.size}
                                onSizeChange ={onSizeChange}
                            />
                        </Box>
                        {
                            (product.inStock > 0)
                            ?(
                                <Button 
                                    className="circular-btn" 
                                    color="secondary" 
                                    onClick={onAddProduct}
                                    disabled={!tempCartProduct.size}
                                >
                                    {
                                        tempCartProduct.size
                                        ? 'Add to cart'
                                        : 'Select a size'
                                    }
                                </Button>
                            ):(
                                <Chip label='Not available' color="error" variant="outlined"/>
                            )
                        }
                        {/* Description */}
                        <Box sx={{mt:3}}>
                            <Typography variant="subtitle2">Description</Typography>
                            <Typography variant="body2">{product.description}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({params}) => {
//     const {slug} = params as {slug:string}
//     const product = await dbProducts.getProductBySlug(slug)
//     if(!product){
//         return{
//             redirect: {
//                 destination: '/404',
//                 permanent: false
//             }
//         }
//     }
//     return {
    //         props: {
        //             product
        //         },
        //     }
        // }
        
        
        
        // You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
        export const getStaticPaths: GetStaticPaths = async (ctx) => {
    
            const productSlugs = await dbProducts.getAllProductSlugs();
            
            return {
                paths: productSlugs.map( ({slug}) => {
                    return {
                        params:{
                            slug
                        }
                    }
                })
                ,
                fallback: "blocking"
            }
        }
        
        // You should use getStaticProps when:
        //- The data required to render the page is available at build time ahead of a user’s request.
        //- The data comes from a headless CMS.
        //- The data can be publicly cached (not user-specific).
        //- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
        
        export const getStaticProps: GetStaticProps = async ({params}) => {
            const {slug} = params as {slug:string}
            const product = await dbProducts.getProductBySlug(slug)
            if(!product){
                return{
                    redirect: {
                        destination: '/404',
                        permanent: false
                    }
                }
            }
            return {
                props: {
                    product
                },
                revalidate: 86400
            }
        }
        
        export default ProductPage
        
        