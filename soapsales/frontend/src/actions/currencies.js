import axios from 'axios';
import {
    GET_CURRENCIES_START,
    GET_CURRENCIES_SUCCESS,
    GET_CURRENCIES_FAIL,
    CREATE_CURRENCY_START,
    CREATE_CURRENCY_SUCCESS,
    CREATE_CURRENCY_FAIL,
    EDIT_CURRENCY
    } from '../types/currencyTypes';
import { currenciesURL } from '../constants';

//currencies
const getCurrencyListStart = () => {
  return {
    type: GET_CURRENCIES_START
  };
};

const getCurrencyListSuccess = currencies => {
  return {
    type: GET_CURRENCIES_SUCCESS,
    currencies
  };
};

const getCurrencyListFail = error => {
  return {
    type: GET_CURRENCIES_FAIL,
    error: error
  };
};

const createCurrencyStart = () => {
  return {
    type: CREATE_CURRENCY_START
  };
};


const createCurrencySuccess = currency => {
  return {
    type: CREATE_CURRENCY_SUCCESS,
    currency
  };
};

const createCurrencyFail = error => {
  return {
    type: CREATE_CURRENCY_FAIL,
    error: error
  };
};

export const getCurrencies = (token) => {
  return dispatch => {
      dispatch(getCurrencyListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(currenciesURL, headers)
        .then(res => {
          const currencies = res.data;
          dispatch(getCurrencyListSuccess(currencies));
          })
        .catch(err => {
          dispatch(getCurrencyListStart(err));
        });
    };
};

export const addCurrency = (currency, token) => {
  return dispatch => {
      dispatch(createCurrencyStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(currenciesURL, currency, headers)
        .then(res => {
          dispatch(createCurrencySuccess(currency));
        })
        .catch(err => {
          dispatch(createCurrencyFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editCurrency = (id, currency, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${currenciesURL}${id}/`, currency, headers)
        .then(res => {
            dispatch({
                type: EDIT_CURRENCY,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
