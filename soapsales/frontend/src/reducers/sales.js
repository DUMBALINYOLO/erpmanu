import {
    ADD_SALE,
    GET_SALES ,
    DELETE_SALE,
    GET_SALE,
} from '../types/saleTypes';

const initialState = {
    sales: [],
    sale: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_SALES:
            return {
                ...state,
                sales: action.payload
            };
        case DELETE_SALE:
            return {
                ...state,
                sale: state.sales.filter(sale=> sale.id !== action.payload)
            };
        case ADD_SALE:
            return {
                ...state,
                sale: [...state.sales, action.payload]
            }
        case GET_SALE:
            return {
                ...state,
                sale:action.payload
                };
        default:
            return state;
    }
}


