import {
    ADD_RAW_MATERIAL,
    GET_RAW_MATERIALS,
    DELETE_RAW_MATERIAL,
    GET_RAW_MATERIAL,
} from '../types/rawmaterialTypes';

const initialState = {
    rawmaterials: [],
    rawmaterial: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_RAW_MATERIALS:
            return {
                ...state,
                rawmaterials: action.payload
            };
        case DELETE_RAW_MATERIAL:
            return {
                ...state,
                rawmaterial: state.rawmaterials.filter(rawmaterial=> rawmaterial.id !== action.payload)
            };
        case ADD_RAW_MATERIAL:
            return {
                ...state,
                rawmaterial: [...state.rawmaterials, action.payload]
            }
        case GET_RAW_MATERIAL:
            return {
                ...state,
                rawmaterial:action.payload
                };
        default:
            return state;
    }
}
