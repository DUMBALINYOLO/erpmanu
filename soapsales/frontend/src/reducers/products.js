import {
        ADD_PRODUCT,
        GET_PRODUCTS,
        EDIT_PRODUCT,
        DELETE_PRODUCT
    } from '../types/productTypes';

const initialState = {
    products: [],
    product: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                product: state.products.filter(product=> product.id !== action.payload)
            };
        case ADD_PRODUCT:
            return {
                ...state,
                product: [...state.products, action.payload]
            };
        case EDIT_PRODUCT:
            const arrayList = state.products;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                products: arrayList,
            };
        default:
            return state;
    }
}
