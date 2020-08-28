import {
        ADD_INTEREST_BEARING_ACCOUNT,
        GET_INTEREST_BEARING_ACCOUNTS,
        DELETE_INTEREST_BEARING_ACCOUNT,
        GET_INTEREST_BEARING_ACCOUNT
    } from '../types/interestbearingaccountTypes';

const initialState = {
    interestbearingaccounts: [],
    interestbearingaccount: [],
    loading: false

}

export default function(state = initialState, action){
    switch(action.type){
        case GET_INTEREST_BEARING_ACCOUNTS:
            return {
                ...state,
                interestbearingaccounts: action.payload
            };
        case DELETE_INTEREST_BEARING_ACCOUNT:
            return {
                ...state,
                interestbearingaccount: state.interestbearingaccounts.filter(interestbearingaccount=> interestbearingaccount.id !== action.payload)
            };
        case ADD_INTEREST_BEARING_ACCOUNT:
            return {
                ...state,
                interestbearingaccount: [...state.interestbearingaccounts, action.payload]
            }
        case GET_INTEREST_BEARING_ACCOUNT:
            return {
                ...state,
                interestbearingaccount:action.payload
                };
        default:
            return state;
    }
}
