import {
    GET_ACCOUNTS_START,
    GET_ACCOUNTS_SUCCESS,
    GET_ACCOUNTS_FAIL,
    CREATE_ACCOUNT_START,
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_FAIL,
    GET_ACCOUNT_START,
    GET_ACCOUNT_SUCCESS,
    GET_ACCOUNT_FAIL,
    EDIT_ACCOUNT
} from '../types/accountTypes';
import { updateObject } from "../utility";

const initialState = {
    accounts: [],
    account: {},
    loading: false,
    error: null,
}

const getAccountListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getAccountListSuccess = (state, action) => {
  return updateObject(state, {
    accounts: action.accounts,
    error: null,
    loading: false
  });
};

const getAccountListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createAccountStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createAccountSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createAccountFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getAccountDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getAccountDetailSuccess = (state, action) => {
  return updateObject(state, {
    account: action.account,
    error: null,
    loading: false
  });
};

const getAccountDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function accounts(state = initialState, action){
    switch(action.type){
        case GET_ACCOUNTS_START:
            return getAccountListStart(state, action);
        case GET_ACCOUNTS_SUCCESS:
            return getAccountListSuccess(state, action);
        case GET_ACCOUNTS_FAIL:
            return getAccountListFail(state, action);
        case CREATE_ACCOUNT_START:
            return createAccountStart(state, action);
        case CREATE_ACCOUNT_SUCCESS:
            return createAccountSuccess(state, action);
        case CREATE_ACCOUNT_FAIL:
            return createAccountFail(state, action);
        case GET_ACCOUNT_START:
        return getAccountDetailStart(state, action);
        case GET_ACCOUNT_SUCCESS:
            return getAccountDetailSuccess(state, action);
        case GET_ACCOUNT_FAIL:
            return getAccountDetailFail(state, action);
        case EDIT_ACCOUNT:
            const arrayList = state.accounts;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                accounts: arrayList,
            };
        default:
            return state;
    }
}
