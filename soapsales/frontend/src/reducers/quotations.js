import { 
    GET_QUOTATIONS_START,
    GET_QUOTATIONS_SUCCESS,
    GET_QUOTATIONS_FAIL,
    GET_QUOTATION_START,
    GET_QUOTATION_SUCCESS,
    GET_QUOTATION_FAIL
} from '../types/quotationTypes';
import { updateObject } from "../utility";

const initialState = {
    quotations: [],
    quotation: {},
    loading: false,
    error: null,
}

const getQuotationListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getQuotationListSuccess = (state, action) => {
  return updateObject(state, {
    quotations: action.quotations,
    error: null,
    loading: false
  });
};

const getQuotationListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getQuotationDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getQuotationDetailSuccess = (state, action) => {
  return updateObject(state, {
    quotation: action.quotation,
    error: null,
    loading: false
  });
};

const getQuotationDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function quotations(state = initialState, action){
    switch(action.type){
        case GET_QUOTATIONS_START:
            return getQuotationListStart(state, action);
        case GET_QUOTATIONS_SUCCESS:
            return getQuotationListSuccess(state, action);
        case GET_QUOTATIONS_FAIL:
            return getQuotationListFail(state, action);
        case GET_QUOTATION_START:
            return getQuotationDetailStart(state, action);
        case GET_QUOTATION_SUCCESS:
            return getQuotationDetailSuccess(state, action);
        case GET_QUOTATION_FAIL:
            return getQuotationDetailFail(state, action);
        default:
            return state;
    }
}

