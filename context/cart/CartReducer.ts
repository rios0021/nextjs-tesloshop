import { stat } from 'fs';
import { ICartProduct } from '../../interfaces';
import { CartState } from './'

type CartActionType = 
| {type: '[CART] - LoadCart from cookies | storage', payload: ICartProduct[]}
| {type: '[CART] - Update products in cart', payload: ICartProduct[]}
| {type: '[CART] - Modify product quantity', payload: ICartProduct}
| {type: '[CART] - Delete product from cart ', payload: ICartProduct}
| {
    type: '[CART] - Update order summary ', 
    payload: {
        numberOfItems: number;
        subtotal: number;
        taxes: number;
        total: number;
    }
}

export const cartReducer = (state: CartState, action: CartActionType):CartState => {
    switch (action.type) {
        case  '[CART] - LoadCart from cookies | storage':
            return{
                ...state,
                cart: [...action.payload]
            }
        case  '[CART] - Update products in cart':
            return{
                ...state,
                cart: [
                    ...action.payload
                ]
            }
        case  '[CART] - Modify product quantity':
            return{
                ...state,
                cart: state.cart.map( product => {
                    if( product._id === action.payload._id  && product.size === action.payload.size){
                        return action.payload
                    }
                    else{
                        return product;
                    }
                })
            }
        case  '[CART] - Delete product from cart ':
            return{
                ...state,
                cart: state.cart.filter( product => {
                        if(product._id !== action.payload._id) return product;
                        if(product.size !== action.payload.size) return product;
                })
            }
        case  '[CART] - Update order summary ':
            return{
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}