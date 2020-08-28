import { ADD_PROCESSED_PRODUCT_STOCK_RECEIPT, GET_PROCESSED_PRODUCT_STOCK_RECEIPTS, GET_PROCESSED_PRODUCT_STOCK_RECEIPT, DELETE_PROCESSED_PRODUCT_STOCK_RECEIPT } from '../types/processedproductstockreceiptTypes';

const initialState = {
    processedproductstockreceipts: [],
    processedproductstockreceipt: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_PROCESSED_PRODUCT_STOCK_RECEIPTS:
            return {
                ...state,
                processedproductstockreceipts: action.payload
            };
        case DELETE_PROCESSED_PRODUCT_STOCK_RECEIPT:
            return {
                ...state,
                processedproductstockreceipt: state.processedproductstockreceipts.filter(processedproductstockreceipt=> processedproductstockreceipt.id !== action.payload)
            };
        case ADD_PROCESSED_PRODUCT_STOCK_RECEIPT:
            return {
                ...state,
                processedproductstockreceipt: [...state.processedproductstockreceipts, action.payload]
            }
        case GET_PROCESSED_PRODUCT_STOCK_RECEIPT:
            return {
                ...state,
                processedproductstockreceipt:action.payload
                };
        default:
            return state;
    }
}
