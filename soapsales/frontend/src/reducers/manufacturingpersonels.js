import { ADD_MANUFACTURING_PERSONEL, GET_MANUFACTURING_PERSONELS, EDIT_MANUFACTURING_PERSONEL, GET_MANUFACTURING_PERSONEL, DELETE_MANUFACTURING_PERSONEL } from '../types/manufacturingpersonelTypes';

const initialState = {
    manufacturingpersonels: [],
    manufacturingpersonel: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_MANUFACTURING_PERSONELS:
            return {
                ...state,
                manufacturingpersonels: action.payload
            };
        case DELETE_MANUFACTURING_PERSONEL:
            return {
                ...state,
                manufacturingpersonel: state.manufacturingpersonels.filter(manufacturingpersonel=> manufacturingpersonel.id !== action.payload)
            };
        case ADD_MANUFACTURING_PERSONEL:
            return {
                ...state,
                manufacturingpersonel: [...state.manufacturingpersonels, action.payload]
            }
        case GET_MANUFACTURING_PERSONEL:
            return {
                ...state,
                manufacturingpersonel:action.payload
            };
        case EDIT_MANUFACTURING_PERSONEL:
            const arrayList = state.manufacturingpersonels;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                manufacturingpersonels: arrayList,
            };
        default:
            return state;
    }
}
