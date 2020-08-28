import {
    ADD_UPCOMING_EVENT,
    GET_UPCOMING_EVENTS ,
    DELETE_UPCOMING_EVENT,
    GET_UPCOMING_EVENT,
} from '../types/upcomingeventTypes';

const initialState = {
    upcomingevents: [],
    upcomingevent: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_UPCOMING_EVENTS:
            return {
                ...state,
                upcomingevents: action.payload
            };
        case DELETE_UPCOMING_EVENT:
            return {
                ...state,
                upcomingevent: state.upcomingevents.filter(upcomingevent=> upcomingevent.id !== action.payload)
            };
        case ADD_UPCOMING_EVENT:
            return {
                ...state,
                upcomingevent: [...state.upcomingevents, action.payload]
            }
        case GET_UPCOMING_EVENT:
            return {
                ...state,
                upcomingevent:action.payload
                };
        default:
            return state;
    }
}
