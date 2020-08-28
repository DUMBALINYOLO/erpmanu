import {
        GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRIES,
        DELETE_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRY,
        GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRY
    } from '../types/unpostedandunadjustedjournalentryTypes';

const initialState = {
    unpostedandunadjustedjournalentries: [],
    unpostedandunadjustedjournalentry: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRIES:
            return {
                ...state,
                unpostedandunadjustedjournalentries: action.payload
            };
        case DELETE_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRY:
            return {
                ...state,
                unpostedandunadjustedjournalentry: state.unpostedandunadjustedjournalentries.filter(unpostedandunadjustedjournalentry=> unpostedandunadjustedjournalentry.id !== action.payload)
            };
        case GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRY:
            return {
                ...state,
                unpostedandunadjustedjournalentry:action.payload
                };
        default:
            return state;
    }
}
