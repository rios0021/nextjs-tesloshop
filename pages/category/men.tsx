import type { NextPage } from 'next'
import Typography from '@mui/material/Typography'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { useProducts } from '../../hooks'
import { FullScreenLoading } from '../../components/ui'


const MenPage: NextPage = () => {
    
    const{products, isLoading} = useProducts('/products?gender=men');
    return (
        <ShopLayout title={'Teslo Shop - Men'} pageDescription={'Find the best Teslo men products here'}>
        <Typography variant="h1" component={'h1'}>Men</Typography>
        <Typography variant="h2" component={'h2'} sx={{ mb:1}}>All products</Typography>
        {
            isLoading
            ? <FullScreenLoading/>
            : <ProductList products={products}/>
        }

        </ShopLayout>
    )
}

export default MenPage
