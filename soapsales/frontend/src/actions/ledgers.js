import axios from 'axios';
import {
    GET_LEDGERS_START,
    GET_LEDGERS_SUCCESS,
    GET_LEDGERS_FAIL,
    CREATE_LEDGER_START,
    CREATE_LEDGER_SUCCESS,
    CREATE_LEDGER_FAIL,
    GET_LEDGER_START,
    GET_LEDGER_SUCCESS,
    GET_LEDGER_FAIL,
    EDIT_LEDGER
    } from '../types/ledgerTypes';
import { ledgersURL } from '../constants';

//ledgers
const getLedgerListStart = () => {
  return {
    type: GET_LEDGERS_START
  };
};

const getLedgerListSuccess = ledgers => {
  return {
    type: GET_LEDGERS_SUCCESS,
    ledgers
  };
};

const getLedgerListFail = error => {
  return {
    type: GET_LEDGERS_FAIL,
    error: error
  };
};

const createLedgerStart = () => {
  return {
    type: CREATE_LEDGER_START
  };
};

const createLedgerSuccess = ledger => {
  return {
    type: CREATE_LEDGER_SUCCESS,
    ledger
  };
};

const createLedgerFail = error => {
  return {
    type: CREATE_LEDGER_FAIL,
    error: error
  };
};

const getLedgerDetailStart = () => {
  return {
    type: GET_LEDGER_START
  };
};

const getLedgerDetailSuccess = ledger => {
  return {
    type: GET_LEDGER_SUCCESS,
    ledger
  };
};

const getLedgerDetailFail = error => {
  return {
    type: GET_LEDGER_FAIL,
    error: error
  };
};

export const getLedgers = (token) => {
  return dispatch => {
      dispatch(getLedgerListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(ledgersURL, headers)
        .then(res => {
          const ledgers = res.data;
          dispatch(getLedgerListSuccess(ledgers));
          })
        .catch(err => {
          dispatch(getLedgerListStart(err));
        });
    };
};

export const getLedger = (id, token) => {
  return dispatch => {
      dispatch(getLedgerDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${ledgersURL}${id}`, headers)
        .then(res => {
          const ledger = res.data;
          dispatch(getLedgerDetailSuccess(ledger));
          })
        .catch(err => {
          dispatch(getLedgerDetailFail(err));
        });
    };
};

export const addLedger = (ledger, token) => {
  return dispatch => {
      dispatch(createLedgerStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(ledgersURL, ledger, headers)
        .then(res => {
          dispatch(createLedgerSuccess(ledger));
        })
        .catch(err => {
          dispatch(createLedgerFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editLedger = (id, ledger, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${ledgersURL}${id}/`, ledger, headers)
    .then(res => {
        dispatch({
            type: EDIT_LEDGER,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
