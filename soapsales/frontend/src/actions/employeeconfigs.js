import axios from 'axios';
import { 
	CREATE_EMPLOYEE_CONFIG_START,
	CREATE_EMPLOYEE_CONFIG_SUCCESS,
	CREATE_EMPLOYEE_CONFIG_FAIL,
  EDIT_EMPLOYEE_CONFIG 
} from '../types/employeeconfigTypes';
import { employeeconfigURL } from '../constants';

//employee configs
const createEmployeeConfigStart = () => {
  return {
    type: CREATE_EMPLOYEE_CONFIG_START
  };
};


const createEmployeeConfigSuccess = employeeconfig => {
  return {
    type: CREATE_EMPLOYEE_CONFIG_SUCCESS,
    employeeconfig
  };
};

const createEmployeeConfigFail = error => {
  return {
    type: CREATE_EMPLOYEE_CONFIG_FAIL,
    error: error
  };
};

export const addEmployeeConfig = (employeeconfig, token) => {
  return dispatch => {
      dispatch(createEmployeeConfigStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(employeeconfigURL, employeeconfig, headers)
        .then(res => {
          dispatch(createEmployeeConfigSuccess(employeeconfig));
        })
        .catch(err => {
          dispatch(createEmployeeConfigFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};


