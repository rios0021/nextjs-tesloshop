import type { NextPage } from 'next'
import Typography from '@mui/material/Typography'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { useProducts } from '../../hooks'
import { FullScreenLoading } from '../../components/ui'


const KidsPage: NextPage = () => {
    
    const{products, isLoading} = useProducts('/products?gender=kid');
    return (
        <ShopLayout title={'Teslo Shop - Kids'} pageDescription={'Find the best Teslo kids products here'}>
        <Typography variant="h1" component={'h1'}>Kids</Typography>
        <Typography variant="h2" component={'h2'} sx={{ mb:1}}>All products</Typography>
        {
            isLoading
            ? <FullScreenLoading/>
            : <ProductList products={products}/>
        }

        </ShopLayout>
    )
}

export default KidsPage
