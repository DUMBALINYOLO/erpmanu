import { GET_RECEIPTS, GET_RECEIPT, DELETE_RECEIPT } from '../types/receiptTypes';

const initialState = {
    receipts: [],
    receipt: [],
    loading: false,
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_RECEIPTS:
            return {
                ...state,
                receipts: action.payload
            };
        case DELETE_RECEIPT:
            return {
                ...state,
                receipt: state.receipts.filter(receipt=> receipt.id !== action.payload)
            };
        case GET_RECEIPT:
            return {
                ...state,
                receipt: action.payload
            };
        default:
            return state;
    }
}
