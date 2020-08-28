import {
        ADD_ACCOUNTING_POST,
        GET_ACCOUNTING_POSTS,
        DELETE_ACCOUNTING_POST,
        GET_ACCOUNTING_POST
    } from '../types/accountingpostTypes';

const initialState = {
    accountingposts: [],
    accountingpost: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ACCOUNTING_POSTS:
            return {
                ...state,
                accountingposts: action.payload
            };
        case DELETE_ACCOUNTING_POST:
            return {
                ...state,
                accountingpost: state.accountingposts.filter(accountingpost=> accountingpost.id !== action.payload)
            };
        case ADD_ACCOUNTING_POST:
            return {
                ...state,
                accountingpost: [...state.accountingposts, action.payload]
            }
        case GET_ACCOUNTING_POST:
            return {
                ...state,
                accountingpost:action.payload
                };
        default:
            return state;
    }
}
