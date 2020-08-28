import {
        ADD_PENDING_EMPLOYEE_LEAVE,
        GET_PENDING_EMPLOYEE_LEAVES,
        DELETE_PENDING_EMPLOYEE_LEAVE,
        GET_PENDING_EMPLOYEE_LEAVE
    } from '../types/pendingemployeeleaveTypes';

const initialState = {
    pendingemployeeleaves: [],
    pendingemployeeleave: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_PENDING_EMPLOYEE_LEAVES:
            return {
                ...state,
                pendingemployeeleaves: action.payload
            };
        case DELETE_PENDING_EMPLOYEE_LEAVE:
            return {
                ...state,
                pendingemployeeleave: state.pendingemployeeleaves.filter(pendingemployeeleave=> pendingemployeeleave.id !== action.payload)
            };
        case ADD_PENDING_EMPLOYEE_LEAVE:
            return {
                ...state,
                pendingemployeeleave: [...state.pendingemployeeleaves, action.payload]
            }
        case GET_PENDING_EMPLOYEE_LEAVE:
            return {
                ...state,
                pendingemployeeleave:action.payload
                };
        default:
            return state;
    }
}
