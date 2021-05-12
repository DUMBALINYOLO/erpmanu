import axios from 'axios';
import {
    GET_POSTED_JOURNAL_ENTRIES_START,
    GET_POSTED_JOURNAL_ENTRIES_SUCCESS,
    GET_POSTED_JOURNAL_ENTRIES_FAIL,
    GET_POSTED_JOURNAL_ENTRY_START,
    GET_POSTED_JOURNAL_ENTRY_SUCCESS,
    GET_POSTED_JOURNAL_ENTRY_FAIL
    } from '../types/postedjournalentryTypes';
import { postedjournalentriesURL } from '../constants';

//posted journal entries
const getPostedJournalEntryListStart = () => {
  return {
    type: GET_POSTED_JOURNAL_ENTRIES_START
  };
};

const getPostedJournalEntryListSuccess = postedjournalentries => {
  return {
    type: GET_POSTED_JOURNAL_ENTRIES_SUCCESS,
    postedjournalentries
  };
};

const getPostedJournalEntryListFail = error => {
  return {
    type: GET_POSTED_JOURNAL_ENTRIES_FAIL,
    error: error
  };
};

const getPostedJournalEntryDetailStart = () => {
  return {
    type: GET_POSTED_JOURNAL_ENTRY_START
  };
};

const getPostedJournalEntryDetailSuccess = postedjournalentry => {
  return {
    type: GET_POSTED_JOURNAL_ENTRY_SUCCESS,
    postedjournalentry
  };
};

const getPostedJournalEntryDetailFail = error => {
  return {
    type: GET_POSTED_JOURNAL_ENTRY_FAIL,
    error: error
  };
};

export const getPostedJournalEntries = (token) => {
  return dispatch => {
      dispatch(getPostedJournalEntryListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(postedjournalentriesURL, headers)
        .then(res => {
          const postedjournalentries = res.data;
          dispatch(getPostedJournalEntryListSuccess(postedjournalentries));
          })
        .catch(err => {
          dispatch(getPostedJournalEntryListStart(err));
        });
    };
};

export const getPostedJournalEntry = (id, token) => {
  return dispatch => {
      dispatch(getPostedJournalEntryDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${postedjournalentriesURL}${id}`, headers)
        .then(res => {
          const postedjournalentry = res.data;
          dispatch(getPostedJournalEntryDetailSuccess(postedjournalentry));
          })
        .catch(err => {
          dispatch(getPostedJournalEntryDetailFail(err));
        });
    };
};

