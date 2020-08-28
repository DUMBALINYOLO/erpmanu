import {
        ADD_COMPANY_SALESREP,
        GET_COMPANY_SALESREPS,
        DELETE_COMPANY_SALESREP,
        GET_COMPANY_SALESREP
    } from '../types/companysalesrepTypes';

const initialState = {
    companysalesreps: [],
    companysalesrep: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_COMPANY_SALESREPS:
            return {
                ...state,
                companysalesreps: action.payload
            };
        case DELETE_COMPANY_SALESREP:
            return {
                ...state,
                companysalesrep: state.companysalesreps.filter(companysalesrep=> companysalesrep.id !== action.payload)
            };
        case ADD_COMPANY_SALESREP:
            return {
                ...state,
                companysalesrep: [...state.companysalesreps, action.payload]
            }
        case GET_COMPANY_SALESREP:
            return {
                ...state,
                companysalesrep:action.payload
                };
        default:
            return state;
    }
}
