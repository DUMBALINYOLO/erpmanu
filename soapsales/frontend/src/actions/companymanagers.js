import axios from 'axios';
import {
    GET_COMPANY_MANAGERS_START,
    GET_COMPANY_MANAGERS_SUCCESS,
    GET_COMPANY_MANAGERS_FAIL,
    CREATE_COMPANY_MANAGER_START,
    CREATE_COMPANY_MANAGER_SUCCESS,
    CREATE_COMPANY_MANAGER_FAIL,
    GET_COMPANY_MANAGER_START,
    GET_COMPANY_MANAGER_SUCCESS,
    GET_COMPANY_MANAGER_FAIL,
    EDIT_COMPANY_MANAGER
    } from '../types/companymanagerTypes';
import { companymanagersURL } from '../constants';

//company managers
const getCompanyManagerListStart = () => {
  return {
    type: GET_COMPANY_MANAGERS_START
  };
};

const getCompanyManagerListSuccess = companymanagers => {
  return {
    type: GET_COMPANY_MANAGERS_SUCCESS,
    companymanagers
  };
};

const getCompanyManagerListFail = error => {
  return {
    type: GET_COMPANY_MANAGERS_FAIL,
    error: error
  };
};

const createCompanyManagerStart = () => {
  return {
    type: CREATE_COMPANY_MANAGER_START
  };
};


const createCompanyManagerSuccess = companymanager => {
  return {
    type: CREATE_COMPANY_MANAGER_SUCCESS,
    companymanager
  };
};

const createCompanyManagerFail = error => {
  return {
    type: CREATE_COMPANY_MANAGER_FAIL,
    error: error
  };
};

const getCompanyManagerDetailStart = () => {
  return {
    type: GET_COMPANY_MANAGER_START
  };
};

const getCompanyManagerDetailSuccess = companymanager => {
  return {
    type: GET_COMPANY_MANAGER_SUCCESS,
    companymanager
  };
};

const getCompanyManagerDetailFail = error => {
  return {
    type: GET_COMPANY_MANAGER_FAIL,
    error: error
  };
};

export const getCompanyManagers = (token) => {
  return dispatch => {
      dispatch(getCompanyManagerListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(companymanagersURL, headers)
        .then(res => {
          const companymanagers = res.data;
          dispatch(getCompanyManagerListSuccess(companymanagers));
          })
        .catch(err => {
          dispatch(getCompanyManagerListStart(err));
        });
    };
};

export const getCompanyManager = (id, token) => {
  return dispatch => {
      dispatch(getCompanyManagerDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${companymanagersURL}${id}`, headers)
        .then(res => {
          const companymanager = res.data;
          dispatch(getCompanyManagerDetailSuccess(companymanager));
          })
        .catch(err => {
          dispatch(getCompanyManagerDetailFail(err));
        });
    };
};

export const addCompanyManager = (companymanager, token) => {
  return dispatch => {
      dispatch(createCompanyManagerStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(companymanagersURL, companymanager, headers)
        .then(res => {
          dispatch(createCompanyManagerSuccess(companymanager));
        })
        .catch(err => {
          dispatch(createCompanyManagerFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editCompanyManager = (id, companymanager, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${companymanagersURL}${id}/`, companymanager, headers)
    .then(res => {
        dispatch({
            type: EDIT_COMPANY_MANAGER,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
