import { ADD_CREDIT_NOTE, GET_CREDIT_NOTES, GET_CREDIT_NOTE, DELETE_CREDIT_NOTE } from '../types/creditnoteTypes';

const initialState = {
    creditnotes: [],
    creditnote: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_CREDIT_NOTES:
            return {
                ...state,
                creditnotes: action.payload
            };
        case DELETE_CREDIT_NOTE:
            return {
                ...state,
                creditnote: state.creditnotes.filter(creditnote=> creditnote.id !== action.payload)
            };
        case ADD_CREDIT_NOTE:
            return {
                ...state,
                creditnote: [...state.creditnotes, action.payload]
            };
        case GET_CREDIT_NOTE:
            return {
                ...state,
                creditnote: action.payload
            };
        default:
            return state;
    }
}
