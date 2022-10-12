import NextLink from "next/link";
import RemoveShoppingCartOutlined from "@mui/icons-material/RemoveShoppingCartOutlined"
import { Box, Link, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"



const EmptyPage = () => {
    return (
        <ShopLayout  title="Empty Cart" pageDescription="No articles in the cart">
            <Box 
                display={'flex'} 
                justifyContent='center' 
                alignItems='center' 
                height='calc(100vh - 200px)'
            >
                <RemoveShoppingCartOutlined sx={{fontSize:100}}/>
                <Box display={'flex'} flexDirection='column' alignItems={'center'} sx={{ml:2}}>
                    <Typography>Your cart is empty</Typography>
                    <NextLink href={'/' } passHref>
                        <Link typography={'h4'} color='secondary'>
                            Return
                        </Link>
                    </NextLink>
                </Box>
            </Box>
        </ShopLayout>
    )
}

export default EmptyPage