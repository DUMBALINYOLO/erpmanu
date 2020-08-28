import { GET_WAREHOUSES, GET_WAREHOUSE, DELETE_WAREHOUSE, ADD_WAREHOUSE  } from '../types/warehouseTypes';

const initialState = {
    warehouses: [],
    warehouse: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_WAREHOUSES:
            return {
                ...state,
                warehouses: action.payload
            };
        case DELETE_WAREHOUSE:
            return {
                ...state,
                warehouse: state.warehouses.filter(warehouse => warehouse.id !== action.payload)
            };
        case ADD_WAREHOUSE:
            return {
                ...state,
                warehouse: [...state.warehouses, action.payload]
            };
        case GET_WAREHOUSE:
            return {
                ...state,
                warehouse: action.payload
            };
        default:
            return state;
    }
}
