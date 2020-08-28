import {
        GET_UNADJUSTED_JOURNAL_ENTRIES,
        DELETE_UNADJUSTED_JOURNAL_ENTRY,
        GET_UNADJUSTED_JOURNAL_ENTRY
    } from '../types/unadjustedjournalentryTypes';

const initialState = {
    unadjustedjournalentries: [],
    unadjustedjournalentry: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_UNADJUSTED_JOURNAL_ENTRIES:
            return {
                ...state,
                unadjustedjournalentries: action.payload
            };
        case DELETE_UNADJUSTED_JOURNAL_ENTRY:
            return {
                ...state,
                unadjustedjournalentry: state.unadjustedjournalentries.filter(unadjustedjournalentry=> unadjustedjournalentry.id !== action.payload)
            };
        case GET_UNADJUSTED_JOURNAL_ENTRY:
            return {
                ...state,
                unadjustedjournalentry:action.payload
                };
        default:
            return state;
    }
}
