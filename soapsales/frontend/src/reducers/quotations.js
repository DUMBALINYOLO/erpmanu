import { GET_QUOTATIONS, GET_QUOTATION, DELETE_QUOTATION } from '../types/quotationTypes';

const initialState = {
    quotations: [],
    quotation: [],
    loading: false,
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_QUOTATIONS:
            return {
                ...state,
                quotations: action.payload
            };
        case DELETE_QUOTATION:
            return {
                ...state,
                quotation: state.quotations.filter(quotation=> quotation.id !== action.payload)
            };
        case GET_QUOTATION:
            return {
                ...state,
                quotation: action.payload
            };
        default:
            return state;
    }
}
