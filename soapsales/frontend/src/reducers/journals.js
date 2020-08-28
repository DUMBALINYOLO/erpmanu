import {
        GET_JOURNALS,
        DELETE_JOURNAL,
        GET_JOURNAL
    } from '../types/journalTypes';

const initialState = {
    journals: [],
    journal: [],
    loading: false

}

export default function(state = initialState, action){
    switch(action.type){
        case GET_JOURNALS:
            return {
                ...state,
                journals: action.payload
            };
        case DELETE_JOURNAL:
            return {
                ...state,
                journal: state.journals.filter(journal=> journal.id !== action.payload)
            };
        case GET_JOURNAL:
            return {
                ...state,
                journal:action.payload
                };
        default:
            return state;
    }
}
