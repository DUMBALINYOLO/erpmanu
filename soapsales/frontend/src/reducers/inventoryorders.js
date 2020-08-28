import {
    ADD_INVENTORY_ORDER,
    GET_INVENTORY_ORDERS ,
    DELETE_INVENTORY_ORDER,
    GET_INVENTORY_ORDER,
} from '../types/inventoryorderTypes';

const initialState = {
    inventoryorders: [],
    inventoryorder: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY_ORDERS:
            return {
                ...state,
                inventoryorders: action.payload
            };
        case DELETE_INVENTORY_ORDER:
            return {
                ...state,
                inventoryorder: state.inventoryorders.filter(inventoryorder=> inventoryorder.id !== action.payload)
            };
        case ADD_INVENTORY_ORDER:
            return {
                ...state,
                inventoryorder: [...state.inventoryorders, action.payload]
            }
        case GET_INVENTORY_ORDER:
            return {
                ...state,
                inventoryorder:action.payload
                };
        default:
            return state;
    }
}
