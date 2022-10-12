import type { NextPage } from 'next'
import Typography from '@mui/material/Typography'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { useProducts } from '../../hooks'
import { FullScreenLoading } from '../../components/ui'


const WomenPage: NextPage = () => {
    
    const{products, isLoading} = useProducts('/products?gender=women');
    return (
        <ShopLayout title={'Teslo Shop - Women'} pageDescription={'Find the best Teslo women products here'}>
        <Typography variant="h1" component={'h1'}>Women</Typography>
        <Typography variant="h2" component={'h2'} sx={{ mb:1}}>All products</Typography>
        {
            isLoading
            ? <FullScreenLoading/>
            : <ProductList products={products}/>
        }

        </ShopLayout>
    )
}

export default WomenPage
