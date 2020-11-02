import {
    ADD_EQUIPMENT,
    GET_EQUIPMENTS,
    DELETE_EQUIPMENT,
    GET_EQUIPMENT,
    EDIT_EQUIPMENT
} from '../types/equipmentTypes';

const initialState = {
    equipments: [],
    equipment: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_EQUIPMENTS:
            return {
                ...state,
                equipments: action.payload
            };
        case DELETE_EQUIPMENT:
            return {
                ...state,
                equipment: state.equipments.filter(equipment=> equipment.id !== action.payload)
            };
        case ADD_EQUIPMENT:
            return {
                ...state,
                equipment: [...state.equipments, action.payload]
            }
        case GET_EQUIPMENT:
            return {
                ...state,
                equipment:action.payload
            };
        case EDIT_EQUIPMENT:
            const arrayList = state.equipments;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                equipments: arrayList,
            };
        default:
            return state;
    }
}
