import {
        ADD_BILL,
        GET_BILLS,
        DELETE_BILL,
        GET_BILL
    } from '../types/billTypes';

const initialState = {
    bills: [],
    bill: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_BILLS:
            return {
                ...state,
                bills: action.payload
            };
        case DELETE_BILL:
            return {
                ...state,
                bill: state.bills.filter(bill=> bill.id !== action.payload)
            };
        case ADD_BILL:
            return {
                ...state,
                bill: [...state.bills, action.payload]
            }
        case GET_BILL:
            return {
                ...state,
                bill:action.payload
                };
        default:
            return state;
    }
}
