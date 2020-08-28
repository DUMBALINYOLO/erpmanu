import {
        GET_CREDITS,
        DELETE_CREDIT,
        GET_CREDIT
    } from '../types/creditTypes';

const initialState = {
    credits: [],
    credit: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_CREDITS:
            return {
                ...state,
                credits: action.payload
            };
        case DELETE_CREDIT:
            return {
                ...state,
                credit: state.credits.filter(credit=> credit.id !== action.payload)
            };
        case GET_CREDIT:
            return {
                ...state,
                credit:action.payload
                };
        default:
            return state;
    }
}
