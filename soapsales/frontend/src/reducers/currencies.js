import {
    GET_CURRENCIES_START,
    GET_CURRENCIES_SUCCESS,
    GET_CURRENCIES_FAIL,
    CREATE_CURRENCY_START,
    CREATE_CURRENCY_SUCCESS,
    CREATE_CURRENCY_FAIL,
    EDIT_CURRENCY
    } from '../types/currencyTypes';
import { updateObject } from "../utility";

const initialState = {
    currencies: [],
    currency: {},
    loading: false,
    error: null,
}

const getCurrencyListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCurrencyListSuccess = (state, action) => {
  return updateObject(state, {
    currencies: action.currencies,
    error: null,
    loading: false
  });
};

const getCurrencyListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createCurrencyStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createCurrencySuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createCurrencyFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};


export default function currencies(state = initialState, action){
    switch(action.type){
        case GET_CURRENCIES_START:
            return getCurrencyListStart(state, action);
        case GET_CURRENCIES_SUCCESS:
            return getCurrencyListSuccess(state, action);
        case GET_CURRENCIES_FAIL:
            return getCurrencyListFail(state, action);
        case CREATE_CURRENCY_START:
            return createCurrencyStart(state, action);
        case CREATE_CURRENCY_SUCCESS:
            return createCurrencySuccess(state, action);
        case CREATE_CURRENCY_FAIL:
            return createCurrencyFail(state, action);
        case EDIT_CURRENCY:
            const arrayList = state.currencies;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                currencies: arrayList,
            };
        default:
            return state;
    }
}
