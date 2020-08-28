import {
        ADD_COMPANY_MANAGER,
        GET_COMPANY_MANAGERS,
        DELETE_COMPANY_MANAGER,
        GET_COMPANY_MANAGER
    } from '../types/companymanagerTypes';

const initialState = {
    companymanagers: [],
    companymanager: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_COMPANY_MANAGERS:
            return {
                ...state,
                companymanagers: action.payload
            };
        case DELETE_COMPANY_MANAGER:
            return {
                ...state,
                companymanager: state.companymanagers.filter(companymanager=> companymanager.id !== action.payload)
            };
        case ADD_COMPANY_MANAGER:
            return {
                ...state,
                companymanager: [...state.companymanagers, action.payload]
            }
        case GET_COMPANY_MANAGER:
            return {
                ...state,
                companymanager:action.payload
                };
        default:
            return state;
    }
}
