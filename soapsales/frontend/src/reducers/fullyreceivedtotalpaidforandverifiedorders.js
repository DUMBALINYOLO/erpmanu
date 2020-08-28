import {
        ADD_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER,
        GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDERS,
        DELETE_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER,
        GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER
    } from '../types/fullyreceivedtotalpaidforandverifiedorderTypes';

const initialState = {
    fullyreceivedtotalpaidforandverifiedorders: [],
    fullyreceivedtotalpaidforandverifiedorder: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDERS:
            return {
                ...state,
                fullyreceivedtotalpaidforandverifiedorders: action.payload
            };
        case DELETE_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER:
            return {
                ...state,
                fullyreceivedtotalpaidforandverifiedorder: state.fullyreceivedtotalpaidforandverifiedorders.filter(fullyreceivedtotalpaidforandverifiedorder=> fullyreceivedtotalpaidforandverifiedorder.id !== action.payload)
            };
        case ADD_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER:
            return {
                ...state,
                fullyreceivedtotalpaidforandverifiedorder: [...state.fullyreceivedtotalpaidforandverifiedorders, action.payload]
            }
        case GET_FULLY_RECEIVED_TOTAL_PAID_FOR_AND_VERIFIED_ORDER:
            return {
                ...state,
                fullyreceivedtotalpaidforandverifiedorder:action.payload
                };
        default:
            return state;
    }
}
