import {
    ADD_INVENTORY_STOCK_TAKE,
    GET_INVENTORY_STOCK_TAKES,
    DELETE_INVENTORY_STOCK_TAKE,
    GET_INVENTORY_STOCK_TAKE,
} from '../types/inventorystocktakeTypes';

const initialState = {
    inventorystocktakes: [],
    inventorystocktake: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY_STOCK_TAKES:
            return {
                ...state,
                inventorystocktakes: action.payload
            };
        case DELETE_INVENTORY_STOCK_TAKE:
            return {
                ...state,
                inventorystocktake: state.inventorystocktakes.filter(inventorystocktake=> inventorystocktake.id !== action.payload)
            };
        case ADD_INVENTORY_STOCK_TAKE:
            return {
                ...state,
                inventorystocktake: [...state.inventorystocktakes, action.payload]
            }
        case GET_INVENTORY_STOCK_TAKE:
            return {
                ...state,
                inventorystocktake:action.payload
                };
        default:
            return state;
    }
}
