import {
        GET_POSTED_JOURNAL_ENTRIES,
        DELETE_POSTED_JOURNAL_ENTRY,
        GET_POSTED_JOURNAL_ENTRY
    } from '../types/postedjournalentryTypes';

const initialState = {
    postedjournalentries: [],
    postedjournalentry: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_POSTED_JOURNAL_ENTRIES:
            return {
                ...state,
                postedjournalentries: action.payload
            };
        case DELETE_POSTED_JOURNAL_ENTRY:
            return {
                ...state,
                postedjournalentry: state.postedjournalentries.filter(postedjournalentry=> postedjournalentry.id !== action.payload)
            };
        case GET_POSTED_JOURNAL_ENTRY:
            return {
                ...state,
                postedjournalentry:action.payload
                };
        default:
            return state;
    }
}
