import {
    ADD_INVENTORY_STOCK_ITEM,
    GET_INVENTORY_STOCK_ITEMS,
    DELETE_INVENTORY_STOCK_ITEM,
    GET_INVENTORY_STOCK_ITEM,
} from '../types/inventorystockitemTypes';

const initialState = {
    inventorystockitems: [],
    inventorystockitem: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY_STOCK_ITEMS:
            return {
                ...state,
                inventorystockitems: action.payload
            };
        case DELETE_INVENTORY_STOCK_ITEM:
            return {
                ...state,
                inventorystockitem: state.inventorystockitems.filter(inventorystockitem=> inventorystockitem.id !== action.payload)
            };
        case ADD_INVENTORY_STOCK_ITEM:
            return {
                ...state,
                inventorystockitem: [...state.inventorystockitems, action.payload]
            }
        case GET_INVENTORY_STOCK_ITEM:
            return {
                ...state,
                inventorystockitem:action.payload
                };
        default:
            return state;
    }
}
