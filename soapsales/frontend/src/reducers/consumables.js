import {
    ADD_CONSUMABLE,
    GET_CONSUMABLES,
    DELETE_CONSUMABLE,
    GET_CONSUMABLE,
} from '../types/consumableTypes';

const initialState = {
    consumables: [],
    consumable: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_CONSUMABLES:
            return {
                ...state,
                consumables: action.payload
            };
        case DELETE_CONSUMABLE:
            return {
                ...state,
                consumable: state.consumables.filter(consumable=> consumable.id !== action.payload)
            };
        case ADD_CONSUMABLE:
            return {
                ...state,
                consumable: [...state.consumables, action.payload]
            }
        case GET_CONSUMABLE:
            return {
                ...state,
                consumable:action.payload
                };
        default:
            return state;
    }
}
