import {
    GET_IN_ACTIVE_ACCOUNTS_START,
    GET_IN_ACTIVE_ACCOUNTS_SUCCESS,
    GET_IN_ACTIVE_ACCOUNTS_FAIL,
    GET_IN_ACTIVE_ACCOUNT_START,
    GET_IN_ACTIVE_ACCOUNT_SUCCESS,
    GET_IN_ACTIVE_ACCOUNT_FAIL
} from '../types/inactiveaccountTypes';
import { updateObject } from "../utility";

const initialState = {
    inactiveaccounts: [],
    inactiveaccount: {},
    loading: false,
    error: null,
}

const getInActiveAccountListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInActiveAccountListSuccess = (state, action) => {
  return updateObject(state, {
    inactiveaccounts: action.inactiveaccounts,
    error: null,
    loading: false
  });
};

const getInActiveAccountListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getInActiveAccountDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInActiveAccountDetailSuccess = (state, action) => {
  return updateObject(state, {
    inactiveaccount: action.inactiveaccount,
    error: null,
    loading: false
  });
};

const getInActiveAccountDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function inactiveaccounts(state = initialState, action){
    switch(action.type){
        case GET_IN_ACTIVE_ACCOUNTS_START:
            return getInActiveAccountListStart(state, action);
        case GET_IN_ACTIVE_ACCOUNTS_SUCCESS:
            return getInActiveAccountListSuccess(state, action);
        case GET_IN_ACTIVE_ACCOUNTS_FAIL:
            return getInActiveAccountListFail(state, action);
        case GET_IN_ACTIVE_ACCOUNT_START:
        return getInActiveAccountDetailStart(state, action);
        case GET_IN_ACTIVE_ACCOUNT_SUCCESS:
            return getInActiveAccountDetailSuccess(state, action);
        case GET_IN_ACTIVE_ACCOUNT_FAIL:
            return getInActiveAccountDetailFail(state, action);
        default:
            return state;
    }
}
