import axios from 'axios';
import {
    GET_JOURNALS_START,
    GET_JOURNALS_SUCCESS,
    GET_JOURNALS_FAIL,
    GET_JOURNAL_START,
    GET_JOURNAL_SUCCESS,
    GET_JOURNAL_FAIL
    } from '../types/journalTypes';
import { journalsURL } from '../constants';

//journals
const getJournalListStart = () => {
  return {
    type: GET_JOURNALS_START
  };
};

const getJournalListSuccess = journals => {
  return {
    type: GET_JOURNALS_SUCCESS,
    journals
  };
};

const getJournalListFail = error => {
  return {
    type: GET_JOURNALS_FAIL,
    error: error
  };
};

const getJournalDetailStart = () => {
  return {
    type: GET_JOURNAL_START
  };
};

const getJournalDetailSuccess = journal => {
  return {
    type: GET_JOURNAL_SUCCESS,
    journal
  };
};

const getJournalDetailFail = error => {
  return {
    type: GET_JOURNAL_FAIL,
    error: error
  };
};

export const getJournals = (token) => {
  return dispatch => {
      dispatch(getJournalListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(journalsURL, headers)
        .then(res => {
          const journals = res.data;
          dispatch(getJournalListSuccess(journals));
          })
        .catch(err => {
          dispatch(getJournalListStart(err));
        });
    };
};

export const getJournal = (id, token) => {
  return dispatch => {
      dispatch(getJournalDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${journalsURL}${id}`, headers)
        .then(res => {
          const journal = res.data;
          dispatch(getJournalDetailSuccess(journal));
          })
        .catch(err => {
          dispatch(getJournalDetailFail(err));
        });
    };
};