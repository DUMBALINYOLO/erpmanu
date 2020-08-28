import { ADD_DEBIT_NOTE, GET_DEBIT_NOTES, GET_DEBIT_NOTE, DELETE_DEBIT_NOTE } from '../types/debitnoteTypes';

const initialState = {
    debitnotes: [],
    debitnote: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_DEBIT_NOTES:
            return {
                ...state,
                debitnotes: action.payload
            };
        case DELETE_DEBIT_NOTE:
            return {
                ...state,
                debitnote: state.debitnotes.filter(debitnote=> debitnote.id !== action.payload)
            };
        case ADD_DEBIT_NOTE:
            return {
                ...state,
                debitnote: [...state.debitnote, action.payload]
            };
        case GET_DEBIT_NOTE:
            return {
                ...state,
                debitnote: action.payload
            };
        default:
            return state;
    }
}
