import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';
import Cookie from 'js-cookie'


export interface CartState {
    cart: ICartProduct[];
    numberOfItems: number;
    subtotal: number;
    taxes: number;
    total: number;
}
const CART_INITIAL_STATE: CartState = {
    cart: [],
    numberOfItems: 0,
    subtotal: 0,
    taxes: 0,
    total: 0,
}


export const CartProvider:FC<PropsWithChildren> = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)
    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
            dispatch({
                type: '[CART] - LoadCart from cookies | storage',
                payload: cookieProducts
            })
        } catch (error) {
            dispatch({
                type: '[CART] - LoadCart from cookies | storage',
                payload: []
            })
        }
    }, []);

    useEffect(() => {
        const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
        const subtotal = state.cart.reduce((prev, current) => (current.price* current.quantity) + prev, 0);
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const orderSummary ={
            numberOfItems,
            subtotal,
            taxes: taxRate * subtotal,
            total: subtotal * (taxRate+1)
        }
        dispatch({
            type: '[CART] - Update order summary ',
            payload:orderSummary
        })
    }, [state.cart]);

    useEffect(() => {
        // Cookie.set('cart', JSON.stringify(state.cart))
        if (state.cart.length > 0) Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart]);
    
    const addProductToCart = (product:ICartProduct) => {
        let match = false;
        const updatedCart = state.cart.map((prod) =>  {
            if((prod._id === product._id) && (prod.size === product.size)){
                prod.quantity += product.quantity
                match = true;
                return prod;
            }else{
                return prod
            }
        })
        if(!match){
            updatedCart.push(product);
        }

        dispatch({
            type: '[CART] - Update products in cart',
            payload: updatedCart
        })
    }

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({
            type: '[CART] - Modify product quantity',
            payload: product
        })
    }
    const deleteProductFromCart = (product: ICartProduct) => {
        dispatch({
            type: '[CART] - Delete product from cart ',
            payload: product
        })
    }
    return (
        <CartContext.Provider value={{
            ...state,
            addProductToCart,
            updateCartQuantity,
            deleteProductFromCart
        }}>
            {children}
        </CartContext.Provider>
    )
}