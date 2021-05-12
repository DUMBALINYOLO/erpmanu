import {
    GET_JOURNALS_START,
    GET_JOURNALS_SUCCESS,
    GET_JOURNALS_FAIL,
    GET_JOURNAL_START,
    GET_JOURNAL_SUCCESS,
    GET_JOURNAL_FAIL
    } from '../types/journalTypes';
import { updateObject } from "../utility";

const initialState = {
    journals: [],
    journal: {},
    loading: false,
    error: null,
}

const getJournalListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getJournalListSuccess = (state, action) => {
  return updateObject(state, {
    journals: action.journals,
    error: null,
    loading: false
  });
};

const getJournalListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getJournalDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getJournalDetailSuccess = (state, action) => {
  return updateObject(state, {
    journal: action.journal,
    error: null,
    loading: false
  });
};

const getJournalDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function journals(state = initialState, action){
    switch(action.type){
        case GET_JOURNALS_START:
            return getJournalListStart(state, action);
        case GET_JOURNALS_SUCCESS:
            return getJournalListSuccess(state, action);
        case GET_JOURNALS_FAIL:
            return getJournalListFail(state, action);
        case GET_JOURNAL_START:
            return getJournalDetailStart(state, action);
        case GET_JOURNAL_SUCCESS:
            return getJournalDetailSuccess(state, action);
        case GET_JOURNAL_FAIL:
            return getJournalDetailFail(state, action);
        default:
            return state;
    }
}
