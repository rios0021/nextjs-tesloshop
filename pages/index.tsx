import type { NextPage } from 'next'
import { ShopLayout } from '../components/layouts'
import Typography from '@mui/material/Typography'
import { ProductList } from '../components/products'
import { useProducts } from '../hooks'
import { FullScreenLoading } from '../components/ui'


const Home: NextPage = () => {
  
  const{products, isLoading} = useProducts('/products');
  
  return (
    <ShopLayout title={'Teslo Shop - Home'} pageDescription={'Find the best Teslo products here'}>
      <Typography variant="h1" component={'h1'}>Home</Typography>
      <Typography variant="h2" component={'h2'} sx={{ mb:1}}>All products</Typography>
      {
        isLoading
        ? <FullScreenLoading/>
        : <ProductList products={products}/>
      }

    </ShopLayout>
  )
}

export default Home
