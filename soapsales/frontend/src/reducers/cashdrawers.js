import { 
    GET_CASH_DRAWERS_START,
    GET_CASH_DRAWERS_SUCCESS,
    GET_CASH_DRAWERS_FAIL,
    GET_CASH_DRAWER_START,
    GET_CASH_DRAWER_SUCCESS,
    GET_CASH_DRAWER_FAIL 
} from '../actions/types.js';
import { updateObject } from "../utility";

const initialState = {
    cashdrawers: [],
    cashdrawer: {},
    loading: false,
    error: null,
}

const getCashDrawerListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCashDrawerListSuccess = (state, action) => {
  return updateObject(state, {
    cashdrawers: action.cashdrawers,
    error: null,
    loading: false
  });
};

const getCashDrawerListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getCashDrawerDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCashDrawerDetailSuccess = (state, action) => {
  return updateObject(state, {
    cashdrawer: action.cashdrawer,
    error: null,
    loading: false
  });
};

const getCashDrawerDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function cashdrawers(state = initialState, action){
    switch(action.type){
        case GET_CASH_DRAWERS_START:
            return getCashDrawerListStart(state, action);
        case GET_CASH_DRAWERS_SUCCESS:
            return getCashDrawerListSuccess(state, action);
        case GET_CASH_DRAWERS_FAIL:
            return getCashDrawerListFail(state, action);
        case GET_CASH_DRAWER_START:
        return getCashDrawerDetailStart(state, action);
        case GET_CASH_DRAWER_SUCCESS:
            return getCashDrawerDetailSuccess(state, action);
        case GET_CASH_DRAWER_FAIL:
            return getCashDrawerDetailFail(state, action);
        default:
            return state;
    }
}
