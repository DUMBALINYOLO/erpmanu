import {
    ADD_INVENTORY_ORDERPAYMENT,
    GET_INVENTORY_ORDERPAYMENTS ,
    DELETE_INVENTORY_ORDERPAYMENT,
    GET_INVENTORY_ORDERPAYMENT,
} from '../types/inventoryorderpaymentTypes';

const initialState = {
    inventoryorderpayments: [],
    inventoryorderpayment: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY_ORDERPAYMENTS:
            return {
                ...state,
                inventoryorderpayments: action.payload
            };
        case DELETE_INVENTORY_ORDERPAYMENT:
            return {
                ...state,
                inventoryorderpayment: state.inventoryorderpayments.filter(inventoryorderpayment=> inventoryorderpayment.id !== action.payload)
            };
        case ADD_INVENTORY_ORDERPAYMENT:
            return {
                ...state,
                inventoryorderpayment: [...state.inventoryorderpayments, action.payload]
            }
        case GET_INVENTORY_ORDERPAYMENT:
            return {
                ...state,
                inventoryorderpayment:action.payload
                };
        default:
            return state;
    }
}
