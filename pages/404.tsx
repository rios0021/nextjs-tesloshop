import { Box, Typography } from '@mui/material';
import React from 'react'
import { ShopLayout } from '../components/layouts/ShopLayout';

const NotFoundPage = () => {
    return (
        <ShopLayout title='Page not found' pageDescription='There is nothing to show!'>
            <Box display={'flex'} justifyContent='center' alignItems='center' height='calc(100vh - 200px)'>
                <Typography variant='h1' component={'h1'} fontSize={{xs:40 , sm: 80}} fontWeight={200} >404 |  </Typography>
                <Typography marginLeft={2}>Nothing found here</Typography>
            </Box>
        </ShopLayout>
    )
}

export default NotFoundPage