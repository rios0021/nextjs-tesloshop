import type { NextPage,GetServerSideProps } from 'next'
import Typography from '@mui/material/Typography'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { IProduct } from '../../interfaces'
import { dbProducts } from '../../database'
import { Box } from '@mui/material'

interface Props {
    products: IProduct[];
    query:string;
    productsFound: boolean;
}

const SearchPage: NextPage<Props> = ({products, query, productsFound}) => {
    
    
    
    return (
        <ShopLayout title={'Teslo Shop - Search'} pageDescription={'Find the best Teslo products here'}>
            <Typography variant="h1" component={'h1'}>Search product</Typography>
            {
                productsFound
                ?   <Typography variant="h2" component={'h2'} sx={{ mb:1}} textTransform='capitalize'>Term: {query}</Typography> 
                :   (
                    <Box display={'flex'}>
                        <Typography variant="h2" component={'h2'} sx={{ mb:1}} >Could not find products related to</Typography>
                        <Typography  variant="h2" sx={{ mb:1, ml:1}} color='secondary' textTransform='capitalize'>{query}</Typography>
                    </Box>
                )
                
            }
            <ProductList products={products}/>
        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const {query = '' } = params as {query: string};
    if(query.trim().length ===0){
        return{
            redirect:{
                destination: '/',
                permanent: true
            }
        }
    }
    let products = await dbProducts.getProductsByTerm(query);
    const productsFound = products.length > 0;
    if(!productsFound){
        products = await dbProducts.getAllProducts()    }
    return {
        props: {
            products,
            query,
            productsFound
        }
    }
}


export default SearchPage
