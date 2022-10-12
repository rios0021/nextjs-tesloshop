import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';


interface ContextProps{
    cart: ICartProduct[];
    numberOfItems: number;
    subtotal: number;
    taxes: number;
    total: number;
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity:(product: ICartProduct) => void;
    deleteProductFromCart:(product: ICartProduct) => void;
}


export const CartContext  = createContext({} as ContextProps);