import {
        ADD_AUTHORISED_EMPLOYEE_LEAVE,
        GET_AUTHORISED_EMPLOYEE_LEAVES,
        DELETE_AUTHORISED_EMPLOYEE_LEAVE,
        GET_AUTHORISED_EMPLOYEE_LEAVE
    } from '../types/authorisedemployeeleaveTypes';

const initialState = {
    authorisedemployeeleaves: [],
    authorisedemployeeleave: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_AUTHORISED_EMPLOYEE_LEAVES:
            return {
                ...state,
                authorisedemployeeleaves: action.payload
            };
        case DELETE_AUTHORISED_EMPLOYEE_LEAVE:
            return {
                ...state,
                authorisedemployeeleave: state.authorisedemployeeleaves.filter(authorisedemployeeleave=> authorisedemployeeleave.id !== action.payload)
            };
        case ADD_AUTHORISED_EMPLOYEE_LEAVE:
            return {
                ...state,
                authorisedemployeeleave: [...state.authorisedemployeeleaves, action.payload]
            }
        case GET_AUTHORISED_EMPLOYEE_LEAVE:
            return {
                ...state,
                authorisedemployeeleave:action.payload
                };
        default:
            return state;
    }
}
