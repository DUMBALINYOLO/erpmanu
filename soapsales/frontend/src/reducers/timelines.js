
import {
    FETCH_TIMELINE_DATA
    
  } from '../types/uitypes';

const initialState = {
    timelines: [],

  };


export default function(state = initialState, action){
    switch(action.type){
        case FETCH_TIMELINE_DATA:
            return {
                ...state,
                timelines: action.payload
            };
        default:
            return state;
    }
}
     


