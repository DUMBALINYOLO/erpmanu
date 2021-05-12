import axios from 'axios';
import {
    GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRIES_START,
    GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRIES_SUCCESS,
    GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRIES_FAIL,
    GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRY_START,
    GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRY_SUCCESS,
    GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRY_FAIL
    } from '../types/unpostedandunadjustedjournalentryTypes';
import { unpostedandunadjustedjournalentriesURL } from '../constants';

//unposted and unadjusted journal entries
const getUnpostedAndUnadjustedJournalEntryListStart = () => {
  return {
    type: GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRIES_START
  };
};

const getUnpostedAndUnadjustedJournalEntryListSuccess = unpostedandunadjustedjournalentries => {
  return {
    type: GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRIES_SUCCESS,
    unpostedandunadjustedjournalentries
  };
};

const getUnpostedAndUnadjustedJournalEntryListFail = error => {
  return {
    type: GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRIES_FAIL,
    error: error
  };
};

const getUnpostedAndUnadjustedJournalEntryDetailStart = () => {
  return {
    type: GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRY_START
  };
};

const getUnpostedAndUnadjustedJournalEntryDetailSuccess = unpostedandunadjustedjournalentry => {
  return {
    type: GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRY_SUCCESS,
    unpostedandunadjustedjournalentry
  };
};

const getUnpostedAndUnadjustedJournalEntryDetailFail = error => {
  return {
    type: GET_UNPOSTED_AND_UNADJUSTED_JOURNAL_ENTRY_FAIL,
    error: error
  };
};

export const getUnpostedAndUnadjustedJournalEntries = (token) => {
  return dispatch => {
      dispatch(getUnpostedAndUnadjustedJournalEntryListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(unpostedandunadjustedjournalentriesURL, headers)
        .then(res => {
          const unpostedandunadjustedjournalentries = res.data;
          dispatch(getUnpostedAndUnadjustedJournalEntryListSuccess(unpostedandunadjustedjournalentries));
          })
        .catch(err => {
          dispatch(getUnpostedAndUnadjustedJournalEntryListStart(err));
        });
    };
};

export const getUnpostedAndUnadjustedJournalEntry = (id, token) => {
  return dispatch => {
      dispatch(getUnpostedAndUnadjustedJournalEntryDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${unpostedandunadjustedjournalentriesURL}${id}`, headers)
        .then(res => {
          const unpostedandunadjustedjournalentry = res.data;
          dispatch(getUnpostedAndUnadjustedJournalEntryDetailSuccess(unpostedandunadjustedjournalentry));
          })
        .catch(err => {
          dispatch(getUnpostedAndUnadjustedJournalEntryDetailFail(err));
        });
    };
};
