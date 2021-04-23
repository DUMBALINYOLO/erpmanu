import { GET_HAULIER } from '../types/haulierTypes';
import {
    ADD_HAULIER,
    GET_HAULIERS,
    EDIT_HAULIER,
    DELETE_HAULIER
} from '../types/haulierTypes';

const initialState = {
    hauliers: [],
    haulier: [],
    loading: false
}

export default function(state = initialState, action){
switch(action.type){
    case GET_HAULIERS:
        return {
            ...state,
            hauliers: action.payload
        };
    case DELETE_HAULIER:
        return {
            ...state,
            haulier: state.hauliers.filter(haulier=> haulier.id !== action.payload)
        };
    case ADD_HAULIER:
        return {
            ...state,
            haulier: [...state.hauliers, action.payload]
        };
    case EDIT_HAULIER:
        return {
            ...state,
            hauliers: state.hauliers.map(x => x.id == action.payload.id ? action.payload : x)
        }
    default:
        return state;
}
}
