import axios from 'axios';
import {
    GET_UNADJUSTED_JOURNAL_ENTRIES_START,
    GET_UNADJUSTED_JOURNAL_ENTRIES_SUCCESS,
    GET_UNADJUSTED_JOURNAL_ENTRIES_FAIL,
    GET_UNADJUSTED_JOURNAL_ENTRY_START,
    GET_UNADJUSTED_JOURNAL_ENTRY_SUCCESS,
    GET_UNADJUSTED_JOURNAL_ENTRY_FAIL
    } from '../types/unadjustedjournalentryTypes';
import { unadjustedjournalentriesURL } from '../constants';

//unadjusted journal entries
const getUnadjustedJournalEntryListStart = () => {
  return {
    type: GET_UNADJUSTED_JOURNAL_ENTRIES_START
  };
};

const getUnadjustedJournalEntryListSuccess = unadjustedjournalentries => {
  return {
    type: GET_UNADJUSTED_JOURNAL_ENTRIES_SUCCESS,
    unadjustedjournalentries
  };
};

const getUnadjustedJournalEntryListFail = error => {
  return {
    type: GET_UNADJUSTED_JOURNAL_ENTRIES_FAIL,
    error: error
  };
};

const getUnadjustedJournalEntryDetailStart = () => {
  return {
    type: GET_UNADJUSTED_JOURNAL_ENTRY_START
  };
};

const getUnadjustedJournalEntryDetailSuccess = unadjustedjournalentry => {
  return {
    type: GET_UNADJUSTED_JOURNAL_ENTRY_SUCCESS,
    unadjustedjournalentry
  };
};

const getUnadjustedJournalEntryDetailFail = error => {
  return {
    type: GET_UNADJUSTED_JOURNAL_ENTRY_FAIL,
    error: error
  };
};

export const getUnadjustedJournalEntryies = (token) => {
  return dispatch => {
      dispatch(getUnadjustedJournalEntryListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(unadjustedjournalentriesURL, headers)
        .then(res => {
          const unadjustedjournalentries = res.data;
          dispatch(getUnadjustedJournalEntryListSuccess(unadjustedjournalentries));
          })
        .catch(err => {
          dispatch(getUnadjustedJournalEntryListStart(err));
        });
    };
};

export const getUnadjustedJournalEntry = (id, token) => {
  return dispatch => {
      dispatch(getUnadjustedJournalEntryDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${unadjustedjournalentriesURL}${id}`, headers)
        .then(res => {
          const unadjustedjournalentry = res.data;
          dispatch(getUnadjustedJournalEntryDetailSuccess(unadjustedjournalentry));
          })
        .catch(err => {
          dispatch(getUnadjustedJournalEntryDetailFail(err));
        });
    };
};

