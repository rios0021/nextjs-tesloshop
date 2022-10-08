import type { NextPage } from 'next'
import { ShopLayout } from '../components/layouts'
import Typography from '@mui/material/Typography'
import { initialData } from '../database/products'
import { ProductList } from '../components/products'


const Home: NextPage = () => {
  return (
    <ShopLayout title={'Teslo Shop - Home'} pageDescription={'Find the best Teslo products here'}>
      <Typography variant="h1" component={'h1'}>Home</Typography>
      <Typography variant="h2" component={'h2'} sx={{ mb:1}}>All products</Typography>

      <ProductList 
        products={initialData.products as any}
      />

    </ShopLayout>
  )
}

export default Home
