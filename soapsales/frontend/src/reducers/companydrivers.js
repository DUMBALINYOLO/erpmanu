import {
        ADD_COMPANY_DRIVER,
        GET_COMPANY_DRIVERS,
        DELETE_COMPANY_DRIVER,
        GET_COMPANY_DRIVER
    } from '../types/companydriverTypes';

const initialState = {
    companydrivers: [],
    companydriver: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_COMPANY_DRIVERS:
            return {
                ...state,
                companydrivers: action.payload
            };
        case DELETE_COMPANY_DRIVER:
            return {
                ...state,
                companydriver: state.companydrivers.filter(companydriver=> companydriver.id !== action.payload)
            };
        case ADD_COMPANY_DRIVER:
            return {
                ...state,
                companydriver: [...state.companydrivers, action.payload]
            }
        case GET_COMPANY_DRIVER:
            return {
                ...state,
                companydriver:action.payload
                };
        default:
            return state;
    }
}
