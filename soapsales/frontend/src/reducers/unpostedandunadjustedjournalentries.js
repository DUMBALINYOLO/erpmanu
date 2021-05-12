import {
    GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRIES_START,
    GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRIES_SUCCESS,
    GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRIES_FAIL,
    GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRY_START,
    GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRY_SUCCESS,
    GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRY_FAIL
    } from '../types/unpostedandunadjustedjournalentryTypes';
import { updateObject } from "../utility";

const initialState = {
    unpostedandunadjustedjournalentries: [],
    unpostedandunadjustedjournalentry: {},
    loading: false,
    error: null,
}

const getUnpostedAndUnadjustedJournalEntryListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getUnpostedAndUnadjustedJournalEntryListSuccess = (state, action) => {
  return updateObject(state, {
    unpostedandunadjustedjournalentries: action.unpostedandunadjustedjournalentries,
    error: null,
    loading: false
  });
};

const getUnpostedAndUnadjustedJournalEntryListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getUnpostedAndUnadjustedJournalEntryDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getUnpostedAndUnadjustedJournalEntryDetailSuccess = (state, action) => {
  return updateObject(state, {
    unpostedandunadjustedjournalentry: action.unpostedandunadjustedjournalentry,
    error: null,
    loading: false
  });
};

const getUnpostedAndUnadjustedJournalEntryDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function unpostedandunadjustedjournalentries(state = initialState, action){
    switch(action.type){
        case GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRIES_START:
            return getUnpostedAndUnadjustedJournalEntryListStart(state, action);
        case GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRIES_SUCCESS:
            return getUnpostedAndUnadjustedJournalEntryListSuccess(state, action);
        case GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRIES_FAIL:
            return getUnpostedAndUnadjustedJournalEntryListFail(state, action);
        case GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRY_START:
            return getUnpostedAndUnadjustedJournalEntryDetailStart(state, action);
        case GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRY_SUCCESS:
            return getUnpostedAndUnadjustedJournalEntryDetailSuccess(state, action);
        case GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRY_FAIL:
            return getUnpostedAndUnadjustedJournalEntryDetailFail(state, action);
        default:
            return state;
    }
}

