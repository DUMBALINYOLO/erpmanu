import {
        GET_UNPOSTED_JOURNAL_ENTRIES,
        DELETE_UNPOSTED_JOURNAL_ENTRY,
        GET_UNPOSTED_JOURNAL_ENTRY
    } from '../types/unpostedjournalentryTypes';

const initialState = {
    unpostedjournalentries: [],
    unpostedjournalentry: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_UNPOSTED_JOURNAL_ENTRIES:
            return {
                ...state,
                unpostedjournalentries: action.payload
            };
        case DELETE_UNPOSTED_JOURNAL_ENTRY:
            return {
                ...state,
                unpostedjournalentry: state.unpostedjournalentries.filter(unpostedjournalentry=> unpostedjournalentry.id !== action.payload)
            };
        case GET_UNPOSTED_JOURNAL_ENTRY:
            return {
                ...state,
                unpostedjournalentry:action.payload
                };
        default:
            return state;
    }
}
