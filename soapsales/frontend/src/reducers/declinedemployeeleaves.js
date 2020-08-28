import {
        ADD_DECLINED_EMPLOYEE_LEAVE,
        GET_DECLINED_EMPLOYEE_LEAVES,
        DELETE_DECLINED_EMPLOYEE_LEAVE,
        GET_DECLINED_EMPLOYEE_LEAVE
    } from '../types/declinedemployeeleaveTypes';

const initialState = {
    declinedemployeeleaves: [],
    declinedemployeeleave: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_DECLINED_EMPLOYEE_LEAVES:
            return {
                ...state,
                declinedemployeeleaves: action.payload
            };
        case DELETE_DECLINED_EMPLOYEE_LEAVE:
            return {
                ...state,
                declinedemployeeleave: state.declinedemployeeleaves.filter(declinedemployeeleave=> declinedemployeeleave.id !== action.payload)
            };
        case ADD_DECLINED_EMPLOYEE_LEAVE:
            return {
                ...state,
                declinedemployeeleave: [...state.declinedemployeeleaves, action.payload]
            }
        case GET_DECLINED_EMPLOYEE_LEAVE:
            return {
                ...state,
                declinedemployeeleave:action.payload
                };
        default:
            return state;
    }
}
