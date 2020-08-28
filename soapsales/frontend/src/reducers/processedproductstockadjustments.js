import { ADD_PROCESSED_PRODUCT_STOCK_ADJUSTMENT, GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENTS, GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENT, DELETE_PROCESSED_PRODUCT_STOCK_ADJUSTMENT } from '../types/processedproductstockadjustmentTypes';

const initialState = {
    processedproductstockadjustments: [],
    processedproductstockadjustment: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENTS:
            return {
                ...state,
                processedproductstockadjustments: action.payload
            };
        case DELETE_PROCESSED_PRODUCT_STOCK_ADJUSTMENT:
            return {
                ...state,
                processedproductstockadjustment: state.processedproductstockadjustments.filter(processedproductstockadjustment=> processedproductstockadjustment.id !== action.payload)
            };
        case ADD_PROCESSED_PRODUCT_STOCK_ADJUSTMENT:
            return {
                ...state,
                processedproductstockadjustment: [...state.processedproductstockadjustments, action.payload]
            }
        case GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENT:
            return {
                ...state,
                processedproductstockadjustment:action.payload
                };
        default:
            return state;
    }
}
