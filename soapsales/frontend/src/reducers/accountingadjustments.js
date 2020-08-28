import {
        ADD_ACCOUNTING_ADJUSTMENT,
        GET_ACCOUNTING_ADJUSTMENTS,
        DELETE_ACCOUNTING_ADJUSTMENT,
        GET_ACCOUNTING_ADJUSTMENT
    } from '../types/accountingadjustmentTypes';

const initialState = {
    accountingadjustments: [],
    accountingadjustment: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ACCOUNTING_ADJUSTMENTS:
            return {
                ...state,
                accountingadjustments: action.payload
            };
        case DELETE_ACCOUNTING_ADJUSTMENT:
            return {
                ...state,
                accountingadjustment: state.accountingadjustments.filter(accountingadjustment=> accountingadjustment.id !== action.payload)
            };
        case ADD_ACCOUNTING_ADJUSTMENT:
            return {
                ...state,
                accountingadjustment: [...state.accountingadjustments, action.payload]
            }
        case GET_ACCOUNTING_ADJUSTMENT:
            return {
                ...state,
                accountingadjustment:action.payload
                };
        default:
            return state;
    }
}
