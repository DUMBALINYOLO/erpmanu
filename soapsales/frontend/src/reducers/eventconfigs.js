import {
    ADD_EVENT_CONFIG
} from '../types/eventconfigTypes';

const initialState = {
    eventconfigs: [],
    eventconfig: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case ADD_EVENT_CONFIG:
            return {
                ...state,
                eventconfig: [...state.eventconfigs, action.payload]
            }
        default:
            return state;
    }
}
