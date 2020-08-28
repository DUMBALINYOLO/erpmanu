import {
        ADD_COMPANY_BOOKKEEPER,
        GET_COMPANY_BOOKKEEPERS,
        DELETE_COMPANY_BOOKKEEPER,
        GET_COMPANY_BOOKKEEPER
    } from '../types/companybookkeeperTypes';

const initialState = {
    companybookkeepers: [],
    companybookkeeper: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_COMPANY_BOOKKEEPERS:
            return {
                ...state,
                companybookkeepers: action.payload
            };
        case DELETE_COMPANY_BOOKKEEPER:
            return {
                ...state,
                companybookkeeper: state.companybookkeepers.filter(companybookkeeper=> companybookkeeper.id !== action.payload)
            };
        case ADD_COMPANY_BOOKKEEPER:
            return {
                ...state,
                companybookkeeper: [...state.companybookkeepers, action.payload]
            }
        case GET_COMPANY_BOOKKEEPER:
            return {
                ...state,
                companybookkeeper:action.payload
                };
        default:
            return state;
    }
}
