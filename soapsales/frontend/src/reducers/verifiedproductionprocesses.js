import {
        GET_VERIFIED_PRODUCTION_PROCESSES,
        DELETE_VERIFIED_PRODUCTION_PROCESS,
        GET_VERIFIED_PRODUCTION_PROCESS
    } from '../types/verifiedproductionprocessTypes';

const initialState = {
    verifiedproductionprocesses: [],
    verifiedproductionprocess: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_VERIFIED_PRODUCTION_PROCESSES:
            return {
                ...state,
                verifiedproductionprocesses: action.payload
            };
        case DELETE_VERIFIED_PRODUCTION_PROCESS:
            return {
                ...state,
                verifiedproductionprocess: state.verifiedproductionprocesses.filter(verifiedproductionprocess=> verifiedproductionprocess.id !== action.payload)
            };
        case GET_VERIFIED_PRODUCTION_PROCESS:
            return {
                ...state,
                verifiedproductionprocess:action.payload
                };
        default:
            return state;
    }
}
