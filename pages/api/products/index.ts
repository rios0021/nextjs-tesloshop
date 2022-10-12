import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../database';
import { IProduct } from '../../../interfaces/products';
import { Product } from '../../../models';

type Data = 
| IProduct[]
| { message: string;}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getProducts(req, res)
    
        default:
            res.status(400).json({ message: 'Bad Request' })
    }

}

const getProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const {gender = 'all'} = req.query;
        let condition = {}
        if(gender != 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)){
            condition = {gender}
        }
        await db.connect();
        const products = await Product.find(condition).lean().select('title images price inStock slug -_id');
        await db.disconnect();
        res.status(200).json( products )
    } catch (error) {
        await db.disconnect();
        res.status(400).json({ message: 'Something went wrong' })
    }

}