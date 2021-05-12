import {
    GET_UNPOSTED_JOURNAL_ENTRIES_START,
    GET_UNPOSTED_JOURNAL_ENTRIES_SUCCESS,
    GET_UNPOSTED_JOURNAL_ENTRIES_FAIL,
    GET_UNPOSTED_JOURNAL_ENTRY_START,
    GET_UNPOSTED_JOURNAL_ENTRY_SUCCESS,
    GET_UNPOSTED_JOURNAL_ENTRY_FAIL
    } from '../types/unpostedjournalentryTypes';
import { updateObject } from "../utility";

const initialState = {
    unpostedjournalentries: [],
    unpostedjournalentry: {},
    loading: false,
    error: null,
}

const getUnpostedJournalEntryListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getUnpostedJournalEntryListSuccess = (state, action) => {
  return updateObject(state, {
    unpostedjournalentries: action.unpostedjournalentries,
    error: null,
    loading: false
  });
};

const getUnpostedJournalEntryListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getUnpostedJournalEntryDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getUnpostedJournalEntryDetailSuccess = (state, action) => {
  return updateObject(state, {
    unpostedjournalentry: action.unpostedjournalentry,
    error: null,
    loading: false
  });
};

const getUnpostedJournalEntryDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function unpostedjournalentries(state = initialState, action){
    switch(action.type){
        case GET_UNPOSTED_JOURNAL_ENTRIES_START:
            return getUnpostedJournalEntryListStart(state, action);
        case GET_UNPOSTED_JOURNAL_ENTRIES_SUCCESS:
            return getUnpostedJournalEntryListSuccess(state, action);
        case GET_UNPOSTED_JOURNAL_ENTRIES_FAIL:
            return getUnpostedJournalEntryListFail(state, action);
        case GET_UNPOSTED_JOURNAL_ENTRY_START:
            return getUnpostedJournalEntryDetailStart(state, action);
        case GET_UNPOSTED_JOURNAL_ENTRY_SUCCESS:
            return getUnpostedJournalEntryDetailSuccess(state, action);
        case GET_UNPOSTED_JOURNAL_ENTRY_FAIL:
            return getUnpostedJournalEntryDetailFail(state, action);
        default:
            return state;
    }
}
