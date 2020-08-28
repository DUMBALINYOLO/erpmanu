import { ADD_PROCESSED_PRODUCT_STOCK_TAKE, GET_PROCESSED_PRODUCT_STOCK_TAKES, GET_PROCESSED_PRODUCT_STOCK_TAKE, DELETE_PROCESSED_PRODUCT_STOCK_TAKE } from '../types/processedproductstocktakeTypes';

const initialState = {
    processedproductstocktakes: [],
    processedproductstocktake: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_PROCESSED_PRODUCT_STOCK_TAKES:
            return {
                ...state,
                processedproductstocktakes: action.payload
            };
        case DELETE_PROCESSED_PRODUCT_STOCK_TAKE:
            return {
                ...state,
                processedproductstocktake: state.processedproductstocktakes.filter(processedproductstocktake=> processedproductstocktake.id !== action.payload)
            };
        case ADD_PROCESSED_PRODUCT_STOCK_TAKE:
            return {
                ...state,
                processedproductstocktake: [...state.processedproductstocktakes, action.payload]
            }
        case GET_PROCESSED_PRODUCT_STOCK_TAKE:
            return {
                ...state,
                processedproductstocktake:action.payload
                };
        default:
            return state;
    }
}
