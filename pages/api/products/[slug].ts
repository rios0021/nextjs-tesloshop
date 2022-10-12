import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces/products';

type Data = 
| IProduct
| {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProductBySlug(req,res);
    
        default:
            return res.status(400).json({message: 'Bad request'});
    }


}

const getProductBySlug = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {slug} = req.query;
    
    try {
        await db.connect();
        const product  = await Product.findOne({slug}).lean();
        await db.disconnect();
        if (!product){
            return res.status(400).json({message: 'No such product'});
        }
        return res.status(200).json(product)
    } catch (error) {
        await db.disconnect();
        return res.status(500).json({message: 'Something went wrong'});
    }
}