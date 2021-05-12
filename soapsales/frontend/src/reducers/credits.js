import {
    GET_CREDITS_START,
    GET_CREDITS_SUCCESS,
    GET_CREDITS_FAIL,
    GET_CREDIT_START,
    GET_CREDIT_SUCCESS,
    GET_CREDIT_FAIL
    } from '../types/creditTypes';
import { updateObject } from "../utility";

const initialState = {
    credits: [],
    credit: {},
    loading: false,
    error: null,
}

const getCreditListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCreditListSuccess = (state, action) => {
  return updateObject(state, {
    credits: action.credits,
    error: null,
    loading: false
  });
};

const getCreditListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getCreditDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCreditDetailSuccess = (state, action) => {
  return updateObject(state, {
    credit: action.credit,
    error: null,
    loading: false
  });
};

const getCreditDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function credits(state = initialState, action){
    switch(action.type){
        case GET_CREDITS_START:
            return getCreditListStart(state, action);
        case GET_CREDITS_SUCCESS:
            return getCreditListSuccess(state, action);
        case GET_CREDITS_FAIL:
            return getCreditListFail(state, action);
        case GET_CREDIT_START:
        return getCreditDetailStart(state, action);
        case GET_CREDIT_SUCCESS:
            return getCreditDetailSuccess(state, action);
        case GET_CREDIT_FAIL:
            return getCreditDetailFail(state, action);
        default:
            return state;
    }
}
