import axios from 'axios';
import { 
    GET_EMPLOYEE_PAYGRADES_START,
    GET_EMPLOYEE_PAYGRADES_SUCCESS,
    GET_EMPLOYEE_PAYGRADES_FAIL,
    CREATE_EMPLOYEE_PAYGRADE_START,
    CREATE_EMPLOYEE_PAYGRADE_SUCCESS,
    CREATE_EMPLOYEE_PAYGRADE_FAIL,
    GET_EMPLOYEE_PAYGRADE_START,
    GET_EMPLOYEE_PAYGRADE_SUCCESS,
    GET_EMPLOYEE_PAYGRADE_FAIL,
    EDIT_EMPLOYEE_PAYGRADE 
} from '../types/employeepaygradeTypes';
import { employeepaygradesURL } from '../constants';

//employee paygrades
const getEmployeePaygradeListStart = () => {
  return {
    type: GET_EMPLOYEE_PAYGRADES_START
  };
};

const getEmployeePaygradeListSuccess = employeepaygrades => {
  return {
    type: GET_EMPLOYEE_PAYGRADES_SUCCESS,
    employeepaygrades
  };
};

const getEmployeePaygradeListFail = error => {
  return {
    type: GET_EMPLOYEE_PAYGRADES_FAIL,
    error: error
  };
};

const createEmployeePaygradeStart = () => {
  return {
    type: CREATE_EMPLOYEE_PAYGRADE_START
  };
};

const createEmployeePaygradeSuccess = employeepaygrade => {
  return {
    type: CREATE_EMPLOYEE_PAYGRADE_SUCCESS,
    employeepaygrade
  };
};

const createEmployeePaygradeFail = error => {
  return {
    type: CREATE_EMPLOYEE_PAYGRADE_FAIL,
    error: error
  };
};

const getEmployeePaygradeDetailStart = () => {
  return {
    type: GET_EMPLOYEE_PAYGRADE_START
  };
};

const getEmployeePaygradeDetailSuccess = employeepaygrade => {
  return {
    type: GET_EMPLOYEE_PAYGRADE_SUCCESS,
    employeepaygrade
  };
};

const getEmployeePaygradeDetailFail = error => {
  return {
    type: GET_EMPLOYEE_PAYGRADE_FAIL,
    error: error
  };
};

export const getEmployeePaygrades = (token) => {
  return dispatch => {
      dispatch(getEmployeePaygradeListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(employeepaygradesURL, headers)
        .then(res => {
          const employeepaygrades = res.data;
          dispatch(getEmployeePaygradeListSuccess(employeepaygrades));
          })
        .catch(err => {
          dispatch(getEmployeePaygradeListStart(err));
        });
    };
};

export const getEmployeePaygrade = (id, token) => {
  return dispatch => {
      dispatch(getEmployeePaygradeDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${employeepaygradesURL}${id}`, headers)
        .then(res => {
          const employeepaygrade = res.data;
          dispatch(getEmployeePaygradeDetailSuccess(employeepaygrade));
          })
        .catch(err => {
          dispatch(getEmployeePaygradeDetailFail(err));
        });
    };
};

export const addEmployeePaygrade = (employeepaygrade, token) => {
  return dispatch => {
      dispatch(createEmployeePaygradeStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(employeepaygradesURL, employeepaygrade, headers)
        .then(res => {
          dispatch(createEmployeePaygradeSuccess(employeepaygrade));
        })
        .catch(err => {
          dispatch(createEmployeePaygradeFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editEmployeePaygrade = (id, employeepaygrade, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${employeepaygradesURL}${id}/`, employeepaygrade, headers)
    .then(res => {
        dispatch({
            type: EDIT_EMPLOYEE_PAYGRADE,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
