import axios from 'axios';
import {
    GET_COMPANY_SALESREPS_START,
    GET_COMPANY_SALESREPS_SUCCESS,
    GET_COMPANY_SALESREPS_FAIL,
    CREATE_COMPANY_SALESREP_START,
    CREATE_COMPANY_SALESREP_SUCCESS,
    CREATE_COMPANY_SALESREP_FAIL,
    GET_COMPANY_SALESREP_START,
    GET_COMPANY_SALESREP_SUCCESS,
    GET_COMPANY_SALESREP_FAIL,
    EDIT_COMPANY_SALESREP
    } from '../types/companysalesrepTypes';
import { companysalesrepsURL } from '../constants';

//company salesreps
const getCompanySalesrepListStart = () => {
  return {
    type: GET_COMPANY_SALESREPS_START
  };
};

const getCompanySalesrepListSuccess = companysalesreps => {
  return {
    type: GET_COMPANY_SALESREPS_SUCCESS,
    companysalesreps
  };
};

const getCompanySalesrepListFail = error => {
  return {
    type: GET_COMPANY_SALESREPS_FAIL,
    error: error
  };
};

const createCompanySalesrepStart = () => {
  return {
    type: CREATE_COMPANY_SALESREP_START
  };
};


const createCompanySalesrepSuccess = companysalesrep => {
  return {
    type: CREATE_COMPANY_SALESREP_SUCCESS,
    companysalesrep
  };
};

const createCompanySalesrepFail = error => {
  return {
    type: CREATE_COMPANY_SALESREP_FAIL,
    error: error
  };
};

const getCompanySalesrepDetailStart = () => {
  return {
    type: GET_COMPANY_SALESREP_START
  };
};

const getCompanySalesrepDetailSuccess = companysalesrep => {
  return {
    type: GET_COMPANY_SALESREP_SUCCESS,
    companysalesrep
  };
};

const getCompanySalesrepDetailFail = error => {
  return {
    type: GET_COMPANY_SALESREP_FAIL,
    error: error
  };
};

export const getCompanySalesreps = (token) => {
  return dispatch => {
      dispatch(getCompanySalesrepListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(companysalesrepsURL, headers)
        .then(res => {
          const companysalesreps = res.data;
          dispatch(getCompanySalesrepListSuccess(companysalesreps));
          })
        .catch(err => {
          dispatch(getCompanySalesrepListStart(err));
        });
    };
};

export const getCompanySalesrep = (id, token) => {
  return dispatch => {
      dispatch(getCompanySalesrepDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${companysalesrepsURL}${id}`, headers)
        .then(res => {
          const companysalesrep = res.data;
          dispatch(getCompanySalesrepDetailSuccess(companysalesrep));
          })
        .catch(err => {
          dispatch(getCompanySalesrepDetailFail(err));
        });
    };
};

export const addCompanySalesrep = (companysalesrep, token) => {
  return dispatch => {
      dispatch(createCompanySalesrepStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(companysalesrepsURL, companysalesrep, headers)
        .then(res => {
          dispatch(createCompanySalesrepSuccess(companysalesrep));
        })
        .catch(err => {
          dispatch(createCompanySalesrepFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editCompanySalesrep = (id, companysalesrep, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${companysalesrepsURL}${id}/`, companysalesrep, headers)
    .then(res => {
        dispatch({
            type: EDIT_COMPANY_SALESREP,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
