import { ADD_SHIFT, GET_SHIFTS, GET_SHIFT, EDIT_SHIFT, DELETE_SHIFT } from '../types/shiftTypes';

const initialState = {
    shifts: [],
    shift: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_SHIFTS:
            return {
                ...state,
                shifts: action.payload
            };
        case DELETE_SHIFT:
            return {
                ...state,
                shift: state.shifts.filter(shift=> shift.id !== action.payload)
            };
        case ADD_SHIFT:
            return {
                ...state,
                shift: [...state.shifts, action.payload]
            }
        case GET_SHIFT:
            return {
                ...state,
                shift:action.payload
            };
        case EDIT_SHIFT:
            const arrayList = state.shifts;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                shifts: arrayList,
            };
        default:
            return state;
    }
}
