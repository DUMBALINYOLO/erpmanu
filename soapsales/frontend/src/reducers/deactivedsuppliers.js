import {
    GET_DE_ACTIVED_SUPPLIERS,
    DELETE_DE_ACTIVED_SUPPLIER,
    GET_DE_ACTIVED_SUPPLIER,
} from '../types/deactivedsupplierTypes';

const initialState = {
    deactivedsuppliers: [],
    deactivedsupplier: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_DE_ACTIVED_SUPPLIERS:
            return {
                ...state,
                deactivedsuppliers: action.payload
            };
        case DELETE_DE_ACTIVED_SUPPLIER:
            return {
                ...state,
                deactivedsupplier: state.deactivedsuppliers.filter(deactivedsupplier=> deactivedsupplier.id !== action.payload)
            };
        case GET_DE_ACTIVED_SUPPLIER:
            return {
                ...state,
                deactivedsupplier:action.payload
                };
        default:
            return state;
    }
}
