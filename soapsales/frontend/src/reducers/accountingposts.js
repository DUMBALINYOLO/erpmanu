import {
        ADD_ACCOUNTING_POST,
        GET_ACCOUNTING_POSTS,
        DELETE_ACCOUNTING_POST,
        GET_ACCOUNTING_POST,
        EDIT_ACCOUNTING_POST
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
        case EDIT_ACCOUNTING_POST:
            const arrayList = state.accountingposts;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                accountingposts: arrayList,
            };
        default:
            return state;
    }
}
