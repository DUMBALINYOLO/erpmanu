import {
    GET_POSTED_JOURNAL_ENTRIES_START,
    GET_POSTED_JOURNAL_ENTRIES_SUCCESS,
    GET_POSTED_JOURNAL_ENTRIES_FAIL,
    GET_POSTED_JOURNAL_ENTRY_START,
    GET_POSTED_JOURNAL_ENTRY_SUCCESS,
    GET_POSTED_JOURNAL_ENTRY_FAIL
    } from '../types/postedjournalentryTypes';
import { updateObject } from "../utility";

const initialState = {
    postedjournalentries: [],
    postedjournalentry: {},
    loading: false,
    error: null,
}

const getPostedJournalEntryListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getPostedJournalEntryListSuccess = (state, action) => {
  return updateObject(state, {
    postedjournalentries: action.postedjournalentries,
    error: null,
    loading: false
  });
};

const getPostedJournalEntryListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getPostedJournalEntryDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getPostedJournalEntryDetailSuccess = (state, action) => {
  return updateObject(state, {
    postedjournalentry: action.postedjournalentry,
    error: null,
    loading: false
  });
};

const getPostedJournalEntryDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function postedjournalentries(state = initialState, action){
    switch(action.type){
        case GET_POSTED_JOURNAL_ENTRIES_START:
            return getPostedJournalEntryListStart(state, action);
        case GET_POSTED_JOURNAL_ENTRIES_SUCCESS:
            return getPostedJournalEntryListSuccess(state, action);
        case GET_POSTED_JOURNAL_ENTRIES_FAIL:
            return getPostedJournalEntryListFail(state, action);
        case GET_POSTED_JOURNAL_ENTRY_START:
            return getPostedJournalEntryDetailStart(state, action);
        case GET_POSTED_JOURNAL_ENTRY_SUCCESS:
            return getPostedJournalEntryDetailSuccess(state, action);
        case GET_POSTED_JOURNAL_ENTRY_FAIL:
            return getPostedJournalEntryDetailFail(state, action);
        default:
            return state;
    }
}
