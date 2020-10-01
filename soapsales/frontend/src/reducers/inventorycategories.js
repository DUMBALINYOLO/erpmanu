import { ADD_INVENTORY_CATEGORY, GET_INVENTORY_CATEGORIES, EDIT_INVENTORY_CATEGORY, GET_INVENTORY_CATEGORY, DELETE_INVENTORY_CATEGORY } from '../types/inventorycategoryTypes';

const initialState = {
    inventorycategories: [],
    inventorycategory: [],
    loading: false,
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY_CATEGORIES:
            return {
                ...state,
                inventorycategories: action.payload
            };
        case DELETE_INVENTORY_CATEGORY:
            return {
                ...state,
                inventorycategory: state.inventorycategories.filter(inventorycategory=> inventorycategory.id !== action.payload)
            };
        case ADD_INVENTORY_CATEGORY:
            return {
                ...state,
                inventorycategory: [...state.inventorycategories, action.payload]
            };
        case GET_INVENTORY_CATEGORY:
            return {
                ...state,
                inventorycategory: action.payload
            };
        case EDIT_INVENTORY_CATEGORY:
            const arrayList = state.inventorycategories;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                inventorycategories: arrayList,
            };
        default:
            return state;
    }
}
