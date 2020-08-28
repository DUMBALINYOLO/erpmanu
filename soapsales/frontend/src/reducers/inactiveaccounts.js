import {
        GET_IN_ACTIVE_ACCOUNTS,
        DELETE_IN_ACTIVE_ACCOUNT,
        GET_IN_ACTIVE_ACCOUNT
    } from '../types/inactiveaccountTypes';

const initialState = {
    inactiveaccounts: [],
    inactiveaccount: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_IN_ACTIVE_ACCOUNTS:
            return {
                ...state,
                inactiveaccounts: action.payload
            };
        case DELETE_IN_ACTIVE_ACCOUNT:
            return {
                ...state,
                inactiveaccount: state.inactiveaccounts.filter(inactiveaccount=> inactiveaccount.id !== action.payload)
            };
        case GET_IN_ACTIVE_ACCOUNT:
            return {
                ...state,
                inactiveaccount:action.payload
                };
        default:
            return state;
    }
}
