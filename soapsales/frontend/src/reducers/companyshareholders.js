import {
        ADD_COMPANY_SHAREHOLDER,
        GET_COMPANY_SHAREHOLDERS,
        DELETE_COMPANY_SHAREHOLDER,
        GET_COMPANY_SHAREHOLDER
    } from '../types/companyshareholderTypes';

const initialState = {
    companyshareholders: [],
    companyshareholder: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_COMPANY_SHAREHOLDERS:
            return {
                ...state,
                companyshareholders: action.payload
            };
        case DELETE_COMPANY_SHAREHOLDER:
            return {
                ...state,
                companyshareholder: state.companyshareholders.filter(companyshareholder=> companyshareholder.id !== action.payload)
            };
        case ADD_COMPANY_SHAREHOLDER:
            return {
                ...state,
                companyshareholder: [...state.companyshareholders, action.payload]
            }
        case GET_COMPANY_SHAREHOLDER:
            return {
                ...state,
                companyshareholder:action.payload
                };
        default:
            return state;
    }
}
