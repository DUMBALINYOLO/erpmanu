import {
        ADD_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER,
        GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDERS,
        DELETE_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER,
        GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER
    } from '../types/fullyreceivedandtotalpaidfororderTypes';

const initialState = {
    fullyreceivedandtotalpaidfororders: [],
    fullyreceivedandtotalpaidfororder: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDERS:
            return {
                ...state,
                fullyreceivedandtotalpaidfororders: action.payload
            };
        case DELETE_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER:
            return {
                ...state,
                fullyreceivedandtotalpaidfororder: state.fullyreceivedandtotalpaidfororders.filter(fullyreceivedandtotalpaidfororder=> fullyreceivedandtotalpaidfororder.id !== action.payload)
            };
        case ADD_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER:
            return {
                ...state,
                fullyreceivedandtotalpaidfororder: [...state.fullyreceivedandtotalpaidfororders, action.payload]
            }
        case GET_FULLY_RECEIVED_AND_TOTAL_PAID_FOR_ORDER:
            return {
                ...state,
                fullyreceivedandtotalpaidfororder:action.payload
                };
        default:
            return state;
    }
}
