import {
    GET_ACTIVE_SUPPLIERS,
    DELETE_ACTIVE_SUPPLIER,
    GET_ACTIVE_SUPPLIER,
} from '../types/activesupplierTypes';

const initialState = {
    activesuppliers: [],
    activesupplier: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ACTIVE_SUPPLIERS:
            return {
                ...state,
                activesuppliers: action.payload
            };
        case DELETE_ACTIVE_SUPPLIER:
            return {
                ...state,
                activesupplier: state.activesuppliers.filter(activesupplier=> activesupplier.id !== action.payload)
            };
        case GET_ACTIVE_SUPPLIER:
            return {
                ...state,
                activesupplier:action.payload
                };
        default:
            return state;
    }
}
