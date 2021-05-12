import {
    ADD_WORKBOOK,
    GET_WORKBOOKS,
    DELETE_WORKBOOK,
    GET_WORKBOOK,
    EDIT_WORKBOOK
    } from '../types/workbookTypes';
import { updateObject } from "../utility";

const initialState = {
    workbooks: [],
    workbook: {},
    loading: false,
    error: null,
}

const getWorkBookListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getWorkBookListSuccess = (state, action) => {
  return updateObject(state, {
    workbooks: action.workbooks,
    error: null,
    loading: false
  });
};

const getWorkBookListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createWorkBookStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createWorkBookSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createWorkBookFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getWorkBookDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getWorkBookDetailSuccess = (state, action) => {
  return updateObject(state, {
    workbook: action.workbook,
    error: null,
    loading: false
  });
};

const getWorkBookDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function workbooks(state = initialState, action){
    switch(action.type){
        case GET_WORKBOOKS_START:
            return getWorkBookListStart(state, action);
        case GET_WORKBOOKS_SUCCESS:
            return getWorkBookListSuccess(state, action);
        case GET_WORKBOOKS_FAIL:
            return getWorkBookListFail(state, action);
        case GET_WORKBOOK_START:
            return getWorkBookDetailStart(state, action);
        case GET_WORKBOOK_SUCCESS:
            return getWorkBookDetailSuccess(state, action);
        case GET_WORKBOOK_FAIL:
            return getWorkBookDetailFail(state, action);
        case CREATE_WORKBOOK_START:
            return createWorkBookStart(state, action);
        case CREATE_WORKBOOK_SUCCESS:
            return createWorkBookSuccess(state, action);
        case CREATE_WORKBOOK_FAIL:
            return createWorkBookFail(state, action);
        case EDIT_WORKBOOK:
            const arrayList = state.workbooks;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                workbooks: arrayList,
            };
        default:
            return state;
    }
}
