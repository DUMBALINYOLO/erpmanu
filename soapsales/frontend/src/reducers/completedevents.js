import {
    ADD_COMPLETED_EVENT,
    GET_COMPLETED_EVENTS ,
    DELETE_COMPLETED_EVENT,
    GET_COMPLETED_EVENT,
} from '../types/completedeventTypes';

const initialState = {
    completedevents: [],
    completedevent: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_COMPLETED_EVENTS:
            return {
                ...state,
                completedevents: action.payload
            };
        case DELETE_COMPLETED_EVENT:
            return {
                ...state,
                completedevent: state.completedevents.filter(completedevent=> completedevent.id !== action.payload)
            };
        case ADD_COMPLETED_EVENT:
            return {
                ...state,
                completedevent: [...state.completedevents, action.payload]
            }
        case GET_COMPLETED_EVENT:
            return {
                ...state,
                completedevent:action.payload
                };
        default:
            return state;
    }
}
