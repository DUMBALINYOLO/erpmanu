import axios from 'axios';
import {
    GET_COMPANY_DRIVERS_START,
    GET_COMPANY_DRIVERS_SUCCESS,
    GET_COMPANY_DRIVERS_FAIL,
    CREATE_COMPANY_DRIVER_START,
    CREATE_COMPANY_DRIVER_SUCCESS,
    CREATE_COMPANY_DRIVER_FAIL,
    GET_COMPANY_DRIVER_START,
    GET_COMPANY_DRIVER_SUCCESS,
    GET_COMPANY_DRIVER_FAIL,
    EDIT_COMPANY_DRIVER
    } from '../types/companydriverTypes';
import { companydriversURL } from '../constants';

//company drivers
const getCompanyDriverListStart = () => {
  return {
    type: GET_COMPANY_DRIVERS_START
  };
};

const getCompanyDriverListSuccess = companydrivers => {
  return {
    type: GET_COMPANY_DRIVERS_SUCCESS,
    companydrivers
  };
};

const getCompanyDriverListFail = error => {
  return {
    type: GET_COMPANY_DRIVERS_FAIL,
    error: error
  };
};

const createCompanyDriverStart = () => {
  return {
    type: CREATE_COMPANY_DRIVER_START
  };
};

const createCompanyDriverSuccess = companydriver => {
  return {
    type: CREATE_COMPANY_DRIVER_SUCCESS,
    companydriver
  };
};

const createCompanyDriverFail = error => {
  return {
    type: CREATE_COMPANY_DRIVER_FAIL,
    error: error
  };
};

const getCompanyDriverDetailStart = () => {
  return {
    type: GET_COMPANY_DRIVER_START
  };
};

const getCompanyDriverDetailSuccess = companydriver => {
  return {
    type: GET_COMPANY_DRIVER_SUCCESS,
    companydriver
  };
};

const getCompanyDriverDetailFail = error => {
  return {
    type: GET_COMPANY_DRIVER_FAIL,
    error: error
  };
};

export const getCompanyDrivers = (token) => {
  return dispatch => {
      dispatch(getCompanyDriverListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(companydriversURL, headers)
        .then(res => {
          const companydrivers = res.data;
          dispatch(getCompanyDriverListSuccess(companydrivers));
          })
        .catch(err => {
          dispatch(getCompanyDriverListStart(err));
        });
    };
};

export const getCompanyDriver = (id, token) => {
  return dispatch => {
      dispatch(getCompanyDriverDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${companydriversURL}${id}`, headers)
        .then(res => {
          const companydriver = res.data;
          dispatch(getCompanyDriverDetailSuccess(companydriver));
          })
        .catch(err => {
          dispatch(getCompanyDriverDetailFail(err));
        });
    };
};

export const addCompanyDriver = (companydriver, token) => {
  return dispatch => {
      dispatch(createCompanyDriverStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(companydriversURL, companydriver, headers)
        .then(res => {
          dispatch(createCompanyDriverSuccess(companydriver));
        })
        .catch(err => {
          dispatch(createCompanyDriverFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editCompanyDriver = (id, companydriver, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${companydriversURL}${id}/`, companydriver, headers)
    .then(res => {
        dispatch({
            type: EDIT_COMPANY_DRIVER,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
