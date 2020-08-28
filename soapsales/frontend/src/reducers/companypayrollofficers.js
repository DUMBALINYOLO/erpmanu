import {
        ADD_COMPANY_PAYROLL_OFFICER,
        GET_COMPANY_PAYROLL_OFFICERS,
        DELETE_COMPANY_PAYROLL_OFFICER,
        GET_COMPANY_PAYROLL_OFFICER
    } from '../types/companypayrollofficerTypes';

const initialState = {
    companypayrollofficers: [],
    companypayrollofficer: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_COMPANY_PAYROLL_OFFICERS:
            return {
                ...state,
                companypayrollofficers: action.payload
            };
        case DELETE_COMPANY_PAYROLL_OFFICER:
            return {
                ...state,
                companypayrollofficer: state.companypayrollofficers.filter(companypayrollofficer=> companypayrollofficer.id !== action.payload)
            };
        case ADD_COMPANY_PAYROLL_OFFICER:
            return {
                ...state,
                companypayrollofficer: [...state.companypayrollofficers, action.payload]
            }
        case GET_COMPANY_PAYROLL_OFFICER:
            return {
                ...state,
                companypayrollofficer:action.payload
                };
        default:
            return state;
    }
}
