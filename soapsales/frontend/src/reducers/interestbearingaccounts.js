import {
    GET_INTEREST_BEARING_ACCOUNTS_START,
    GET_INTEREST_BEARING_ACCOUNTS_SUCCESS,
    GET_INTEREST_BEARING_ACCOUNTS_FAIL,
    CREATE_INTEREST_BEARING_ACCOUNT_START,
    CREATE_INTEREST_BEARING_ACCOUNT_SUCCESS,
    CREATE_INTEREST_BEARING_ACCOUNT_FAIL,
    GET_INTEREST_BEARING_ACCOUNT_START,
    GET_INTEREST_BEARING_ACCOUNT_SUCCESS,
    GET_INTEREST_BEARING_ACCOUNT_FAIL,
    EDIT_INTEREST_BEARING_ACCOUNT
} from '../types/interestbearingaccountTypes';
import { updateObject } from "../utility";

const initialState = {
    interestbearingaccounts: [],
    interestbearingaccount: {},
    loading: false,
    error: null,
}

const getInterestBearingAccountListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInterestBearingAccountListSuccess = (state, action) => {
  return updateObject(state, {
    interestbearingaccounts: action.interestbearingaccounts,
    error: null,
    loading: false
  });
};

const getInterestBearingAccountListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createInterestBearingAccountStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createInterestBearingAccountSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createInterestBearingAccountFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getInterestBearingAccountDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInterestBearingAccountDetailSuccess = (state, action) => {
  return updateObject(state, {
    interestbearingaccount: action.interestbearingaccount,
    error: null,
    loading: false
  });
};

const getInterestBearingAccountDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function interestbearingaccounts(state = initialState, action){
    switch(action.type){
        case GET_INTEREST_BEARING_ACCOUNTS_START:
            return getInterestBearingAccountListStart(state, action);
        case GET_INTEREST_BEARING_ACCOUNTS_SUCCESS:
            return getInterestBearingAccountListSuccess(state, action);
        case GET_INTEREST_BEARING_ACCOUNTS_FAIL:
            return getInterestBearingAccountListFail(state, action);
        case CREATE_INTEREST_BEARING_ACCOUNT_START:
            return createInterestBearingAccountStart(state, action);
        case CREATE_INTEREST_BEARING_ACCOUNT_SUCCESS:
            return createInterestBearingAccountSuccess(state, action);
        case CREATE_INTEREST_BEARING_ACCOUNT_FAIL:
            return createInterestBearingAccountFail(state, action);
        case GET_INTEREST_BEARING_ACCOUNT_START:
        return getInterestBearingAccountDetailStart(state, action);
        case GET_INTEREST_BEARING_ACCOUNT_SUCCESS:
            return getInterestBearingAccountDetailSuccess(state, action);
        case GET_INTEREST_BEARING_ACCOUNT_FAIL:
            return getInterestBearingAccountDetailFail(state, action);
        case EDIT_INTEREST_BEARING_ACCOUNT:
            const arrayList = state.interestbearingaccounts;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                interestbearingaccounts: arrayList,
            };
        default:
            return state;
    }
}
