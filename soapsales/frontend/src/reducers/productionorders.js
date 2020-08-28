import { GET_PRODUCTION_ORDERS, GET_PRODUCTION_ORDER, DELETE_PRODUCTION_ORDER, ADD_PRODUCTION_ORDER  } from "../types/productionorderTypes";

const initialState = {
    productionorders: [],
    productionorder: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_PRODUCTION_ORDERS:
            return {
                ...state,
                productionorders: action.payload
            };
        case DELETE_PRODUCTION_ORDER:
            return {
                ...state,
                productionorder: state.productionorders.filter(productionorder => productionorder.id !== action.payload)
            };
        case ADD_PRODUCTION_ORDER:
            return {
                ...state,
                productionorder: [...state.productionorders, action.payload]
            };
        case GET_PRODUCTION_ORDER:
            return {
                ...state,
                productionorder: action.payload
            };
        default:
            return state;
    }
}
