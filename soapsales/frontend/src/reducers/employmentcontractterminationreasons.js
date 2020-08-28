import { GET_EMPLOYMENT_CONTRACT_TERMINATION_REASONS } from '../actions/types.js';

const initialState = {
   employmentcontractterminationreasons: [],
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYMENT_CONTRACT_TERMINATION_REASONS:
            return {
                ...state,
                employmentcontractterminationreasons: action.payload
            };
        default:
            return state;
    }
}
