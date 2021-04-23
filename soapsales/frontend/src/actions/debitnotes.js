import axios from 'axios';
import {
    GET_DEBIT_NOTES_START,
    GET_DEBIT_NOTES_SUCCESS,
    GET_DEBIT_NOTES_FAIL,
    CREATE_DEBIT_NOTE_START,
    CREATE_DEBIT_NOTE_SUCCESS,
    CREATE_DEBIT_NOTE_FAIL,
    GET_DEBIT_NOTE_START,
    GET_DEBIT_NOTE_SUCCESS,
    GET_DEBIT_NOTE_FAIL
    } from '../types/debitnoteTypes';
import { debitnotesURL } from '../constants';

//debitnotes
const getDebitNoteListStart = () => {
  return {
    type: GET_DEBIT_NOTES_START
  };
};

const getDebitNoteListSuccess = debitnotes => {
  return {
    type: GET_DEBIT_NOTES_SUCCESS,
    debitnotes
  };
};

const getDebitNoteListFail = error => {
  return {
    type: GET_DEBIT_NOTES_FAIL,
    error: error
  };
};

const createDebitNoteStart = () => {
  return {
    type: CREATE_DEBIT_NOTE_START
  };
};

const createDebitNoteSuccess = debitnote => {
  return {
    type: CREATE_DEBIT_NOTE_SUCCESS,
    debitnote
  };
};

const createDebitNoteFail = error => {
  return {
    type: CREATE_DEBIT_NOTE_FAIL,
    error: error
  };
};

const getDebitNoteDetailStart = () => {
  return {
    type: GET_DEBIT_NOTE_START
  };
};

const getDebitNoteDetailSuccess = debitnote => {
  return {
    type: GET_DEBIT_NOTE_SUCCESS,
    debitnote
  };
};

const getDebitNoteDetailFail = error => {
  return {
    type: GET_DEBIT_NOTE_FAIL,
    error: error
  };
};

export const getDebitNotes = (token) => {
  return dispatch => {
      dispatch(getDebitNoteListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(debitnotesURL, headers)
        .then(res => {
          const debitnotes = res.data;
          dispatch(getDebitNoteListSuccess(debitnotes));
          })
        .catch(err => {
          dispatch(getDebitNoteListStart(err));
        });
    };
};

export const getDebitNote = (id, token) => {
  return dispatch => {
      dispatch(getDebitNoteDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${debitnotesURL}${id}`, headers)
        .then(res => {
          const debitnote = res.data;
          dispatch(getDebitNoteDetailSuccess(debitnote));
          })
        .catch(err => {
          dispatch(getDebitNoteDetailFail(err));
        });
    };
};

export const addDebitNote = (debitnote, token) => {
  return dispatch => {
      dispatch(createDebitNoteStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(debitnotesURL, debitnote, headers)
        .then(res => {
          dispatch(createDebitNoteSuccess(debitnote));
        })
        .catch(err => {
          dispatch(createDebitNoteFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

