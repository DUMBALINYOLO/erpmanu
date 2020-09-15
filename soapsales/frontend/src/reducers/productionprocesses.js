import { GET_PROCESSES } from '../actions/types.js';

const initialState = {
   productionprocesses : [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_PROCESSES:
            return {
                ...state,
                productionprocesses: action.payload
            };
        default:
            return state;
    }
}