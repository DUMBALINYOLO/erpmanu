import {
        GET_UNVERIFIED_PRODUCTION_PROCESSES,
        DELETE_UNVERIFIED_PRODUCTION_PROCESS,
        GET_UNVERIFIED_PRODUCTION_PROCESS
    } from '../types/unverifiedproductionprocessTypes';
import { ADD_PROCESS } from '../actions/types.js';

const initialState = {
    unverifiedproductionprocesses: [],
    unverifiedproductionprocess: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_UNVERIFIED_PRODUCTION_PROCESSES:
            return {
                ...state,
                unverifiedproductionprocesses: action.payload
            };
        case DELETE_UNVERIFIED_PRODUCTION_PROCESS:
            return {
                ...state,
                unverifiedproductionprocess: state.unverifiedproductionprocesses.filter(unverifiedproductionprocess=> unverifiedproductionprocess.id !== action.payload)
            };
        case ADD_PROCESS:
            return {
                ...state,
                process: [...state.unverifiedproductionprocess, action.payload]
            };
        case GET_UNVERIFIED_PRODUCTION_PROCESS:
            return {
                ...state,
                unverifiedproductionprocess:action.payload
                };
        default:
            return state;
    }
}
