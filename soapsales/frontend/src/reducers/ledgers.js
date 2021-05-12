import {
    GET_LEDGERS_START,
    GET_LEDGERS_SUCCESS,
    GET_LEDGERS_FAIL,
    GET_LEDGER_START,
    GET_LEDGER_SUCCESS,
    GET_LEDGER_FAIL,
    CREATE_LEDGER_START,
    CREATE_LEDGER_SUCCESS,
    CREATE_LEDGER_FAIL,
    EDIT_LEDGER
    } from '../types/ledgerTypes';
import { updateObject } from "../utility";

const initialState = {
    ledgers: [],
    ledger: {},
    loading: false,
    error: null,
}

const getLedgerListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getLedgerListSuccess = (state, action) => {
  return updateObject(state, {
    ledgers: action.ledgers,
    error: null,
    loading: false
  });
};

const getLedgerListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createLedgerStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createLedgerSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createLedgerFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getLedgerDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getLedgerDetailSuccess = (state, action) => {
  return updateObject(state, {
    ledger: action.ledger,
    error: null,
    loading: false
  });
};

const getLedgerDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function ledgers(state = initialState, action){
    switch(action.type){
        case GET_LEDGERS_START:
            return getLedgerListStart(state, action);
        case GET_LEDGERS_SUCCESS:
            return getLedgerListSuccess(state, action);
        case GET_LEDGERS_FAIL:
            return getLedgerListFail(state, action);
        case GET_LEDGER_START:
            return getLedgerDetailStart(state, action);
        case GET_LEDGER_SUCCESS:
            return getLedgerDetailSuccess(state, action);
        case GET_LEDGER_FAIL:
            return getLedgerDetailFail(state, action);
        case CREATE_LEDGER_START:
            return createLedgerStart(state, action);
        case CREATE_LEDGER_SUCCESS:
            return createLedgerSuccess(state, action);
        case CREATE_LEDGER_FAIL:
            return createLedgerFail(state, action);
        case EDIT_LEDGER:
            const arrayList = state.ledgers;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                ledgers: arrayList,
            };
        default:
            return state;
    }
}
