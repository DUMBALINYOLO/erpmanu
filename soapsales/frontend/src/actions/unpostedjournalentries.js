import axios from 'axios';
import {
    GET_UNPOSTED_JOURNAL_ENTRIES_START,
    GET_UNPOSTED_JOURNAL_ENTRIES_SUCCESS,
    GET_UNPOSTED_JOURNAL_ENTRIES_FAIL,
    GET_UNPOSTED_JOURNAL_ENTRY_START,
    GET_UNPOSTED_JOURNAL_ENTRY_SUCCESS,
    GET_UNPOSTED_JOURNAL_ENTRY_FAIL
    } from '../types/unpostedjournalentryTypes';
import { unpostedjournalentriesURL } from '../constants';

//unposted journal entries
const getUnpostedJournalEntryListStart = () => {
  return {
    type: GET_UNPOSTED_JOURNAL_ENTRIES_START
  };
};

const getUnpostedJournalEntryListSuccess = unpostedjournalentries => {
  return {
    type: GET_UNPOSTED_JOURNAL_ENTRIES_SUCCESS,
    unpostedjournalentries
  };
};

const getUnpostedJournalEntryListFail = error => {
  return {
    type: GET_UNPOSTED_JOURNAL_ENTRIES_FAIL,
    error: error
  };
};

const getUnpostedJournalEntryDetailStart = () => {
  return {
    type: GET_UNPOSTED_JOURNAL_ENTRY_START
  };
};

const getUnpostedJournalEntryDetailSuccess = unpostedjournalentry => {
  return {
    type: GET_UNPOSTED_JOURNAL_ENTRY_SUCCESS,
    unpostedjournalentry
  };
};

const getUnpostedJournalEntryDetailFail = error => {
  return {
    type: GET_UNPOSTED_JOURNAL_ENTRY_FAIL,
    error: error
  };
};

export const getUnpostedJournalEntries = (token) => {
  return dispatch => {
      dispatch(getUnpostedJournalEntryListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(unpostedjournalentriesURL, headers)
        .then(res => {
          const unpostedjournalentries = res.data;
          dispatch(getUnpostedJournalEntryListSuccess(unpostedjournalentries));
          })
        .catch(err => {
          dispatch(getUnpostedJournalEntryListStart(err));
        });
    };
};

export const getUnpostedJournalEntry = (id, token) => {
  return dispatch => {
      dispatch(getUnpostedJournalEntryDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${unpostedjournalentriesURL}${id}`, headers)
        .then(res => {
          const unpostedjournalentry = res.data;
          dispatch(getUnpostedJournalEntryDetailSuccess(unpostedjournalentry));
          })
        .catch(err => {
          dispatch(getUnpostedJournalEntryDetailFail(err));
        });
    };
};
