import {
    GET_DEBITS_START,
    GET_DEBITS_SUCCESS,
    GET_DEBITS_FAIL,
    GET_DEBIT_START,
    GET_DEBIT_SUCCESS,
    GET_DEBIT_FAIL
    } from '../types/debitTypes';
import { updateObject } from "../utility";

const initialState = {
    debits: [],
    debit: {},
    loading: false,
    error: null,
}

const getDebitListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getDebitListSuccess = (state, action) => {
  return updateObject(state, {
    debits: action.debits,
    error: null,
    loading: false
  });
};

const getDebitListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getDebitDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getDebitDetailSuccess = (state, action) => {
  return updateObject(state, {
    debit: action.debit,
    error: null,
    loading: false
  });
};

const getDebitDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function debits(state = initialState, action){
    switch(action.type){
        case GET_DEBITS_START:
            return getDebitListStart(state, action);
        case GET_DEBITS_SUCCESS:
            return getDebitListSuccess(state, action);
        case GET_DEBITS_FAIL:
            return getDebitListFail(state, action);
        case GET_DEBIT_START:
        return getDebitDetailStart(state, action);
        case GET_DEBIT_SUCCESS:
            return getDebitDetailSuccess(state, action);
        case GET_DEBIT_FAIL:
            return getDebitDetailFail(state, action);
        default:
            return state;
    }
}

