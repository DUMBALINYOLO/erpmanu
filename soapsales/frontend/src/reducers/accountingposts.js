import {
    GET_ACCOUNTING_POSTS_START,
    GET_ACCOUNTING_POSTS_SUCCESS,
    GET_ACCOUNTING_POSTS_FAIL,
    CREATE_ACCOUNTING_POST_START,
    CREATE_ACCOUNTING_POST_SUCCESS,
    CREATE_ACCOUNTING_POST_FAIL,
    GET_ACCOUNTING_POST_START,
    GET_ACCOUNTING_POST_SUCCESS,
    GET_ACCOUNTING_POST_FAIL,
    EDIT_ACCOUNTING_POST
    } from '../types/accountingpostTypes';
import { updateObject } from "../utility";

const initialState = {
    accountingposts: [],
    accountingpost: {},
    loading: false,
    error: null,
}

const getAccountingPostListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getAccountingPostListSuccess = (state, action) => {
  return updateObject(state, {
    accountingposts: action.accountingposts,
    error: null,
    loading: false
  });
};

const getAccountingPostListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createAccountingPostStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createAccountingPostSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createAccountingPostFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getAccountingPostDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getAccountingPostDetailSuccess = (state, action) => {
  return updateObject(state, {
    accountingpost: action.accountingpost,
    error: null,
    loading: false
  });
};

const getAccountingPostDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function accountingposts(state = initialState, action){
    switch(action.type){
        case GET_ACCOUNTING_POSTS_START:
            return getAccountingPostListStart(state, action);
        case GET_ACCOUNTING_POSTS_SUCCESS:
            return getAccountingPostListSuccess(state, action);
        case GET_ACCOUNTING_POSTS_FAIL:
            return getAccountingPostListFail(state, action);
        case CREATE_ACCOUNTING_POST_START:
            return createAccountingPostStart(state, action);
        case CREATE_ACCOUNTING_POST_SUCCESS:
            return createAccountingPostSuccess(state, action);
        case CREATE_ACCOUNTING_POST_FAIL:
            return createAccountingPostFail(state, action);
        case GET_ACCOUNTING_POST_START:
        return getAccountingPostDetailStart(state, action);
        case GET_ACCOUNTING_POST_SUCCESS:
            return getAccountingPostDetailSuccess(state, action);
        case GET_ACCOUNTING_POST_FAIL:
            return getAccountingPostDetailFail(state, action);
        case EDIT_ACCOUNTING_POST:
            const arrayList = state.accountingposts;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                accountingposts: arrayList,
            };
        default:
            return state;
    }
}
