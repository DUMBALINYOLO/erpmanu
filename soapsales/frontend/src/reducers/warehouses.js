import { GET_WAREHOUSES, GET_WAREHOUSE, EDIT_WAREHOUSE, DELETE_WAREHOUSE, ADD_WAREHOUSE  } from '../types/warehouseTypes';

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
        case EDIT_WAREHOUSE:
            const arrayList = state.warehouses;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                warehouses: arrayList,
            };
        default:
            return state;
    }
}
