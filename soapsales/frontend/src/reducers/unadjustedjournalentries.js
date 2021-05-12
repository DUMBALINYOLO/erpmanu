import {
    GET_UNADJUSTED_JOURNAL_ENTRIES_START,
    GET_UNADJUSTED_JOURNAL_ENTRIES_SUCCESS,
    GET_UNADJUSTED_JOURNAL_ENTRIES_FAIL,
    GET_UNADJUSTED_JOURNAL_ENTRY_START,
    GET_UNADJUSTED_JOURNAL_ENTRY_SUCCESS,
    GET_UNADJUSTED_JOURNAL_ENTRY_FAIL
    } from '../types/unadjustedjournalentryTypes';
import { updateObject } from "../utility";

const initialState = {
    unadjustedjournalentries: [],
    unadjustedjournalentry: {},
    loading: false,
    error: null,
}

const getUnadjustedJournalEntryListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getUnadjustedJournalEntryListSuccess = (state, action) => {
  return updateObject(state, {
    unadjustedjournalentries: action.unadjustedjournalentries,
    error: null,
    loading: false
  });
};

const getUnadjustedJournalEntryListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getUnadjustedJournalEntryDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getUnadjustedJournalEntryDetailSuccess = (state, action) => {
  return updateObject(state, {
    unadjustedjournalentry: action.unadjustedjournalentry,
    error: null,
    loading: false
  });
};

const getUnadjustedJournalEntryDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function unadjustedjournalentries(state = initialState, action){
    switch(action.type){
        case GET_UNADJUSTED_JOURNAL_ENTRIES_START:
            return getUnadjustedJournalEntryListStart(state, action);
        case GET_UNADJUSTED_JOURNAL_ENTRIES_SUCCESS:
            return getUnadjustedJournalEntryListSuccess(state, action);
        case GET_UNADJUSTED_JOURNAL_ENTRIES_FAIL:
            return getUnadjustedJournalEntryListFail(state, action);
        case GET_UNADJUSTED_JOURNAL_ENTRY_START:
            return getUnadjustedJournalEntryDetailStart(state, action);
        case GET_UNADJUSTED_JOURNAL_ENTRY_SUCCESS:
            return getUnadjustedJournalEntryDetailSuccess(state, action);
        case GET_UNADJUSTED_JOURNAL_ENTRY_FAIL:
            return getUnadjustedJournalEntryDetailFail(state, action);
        default:
            return state;
    }
}
