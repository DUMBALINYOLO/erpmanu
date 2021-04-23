import axios from 'axios';
import { 
    GET_EMPLOYEE_ALLOWANCES_START,
    GET_EMPLOYEE_ALLOWANCES_SUCCESS,
    GET_EMPLOYEE_ALLOWANCES_FAIL,
    CREATE_EMPLOYEE_ALLOWANCE_START,
    CREATE_EMPLOYEE_ALLOWANCE_SUCCESS,
    CREATE_EMPLOYEE_ALLOWANCE_FAIL,
    GET_EMPLOYEE_ALLOWANCE_START,
    GET_EMPLOYEE_ALLOWANCE_SUCCESS,
    GET_EMPLOYEE_ALLOWANCE_FAIL,
    EDIT_EMPLOYEE_ALLOWANCE 
} from '../types/employeeallowanceTypes';
import { employeeallowancesURL } from '../constants';

//employee allowances
const getEmployeeAllowanceListStart = () => {
  return {
    type: GET_EMPLOYEE_ALLOWANCES_START
  };
};

const getEmployeeAllowanceListSuccess = employeeallowances => {
  return {
    type: GET_EMPLOYEE_ALLOWANCES_SUCCESS,
    employeeallowances
  };
};

const getEmployeeAllowanceListFail = error => {
  return {
    type: GET_EMPLOYEE_ALLOWANCES_FAIL,
    error: error
  };
};

const createEmployeeAllowanceStart = () => {
  return {
    type: CREATE_EMPLOYEE_ALLOWANCE_START
  };
};

const createEmployeeAllowanceSuccess = employeeallowance => {
  return {
    type: CREATE_EMPLOYEE_ALLOWANCE_SUCCESS,
    employeeallowance
  };
};

const createEmployeeAllowanceFail = error => {
  return {
    type: CREATE_EMPLOYEE_ALLOWANCE_FAIL,
    error: error
  };
};

const getEmployeeAllowanceDetailStart = () => {
  return {
    type: GET_EMPLOYEE_ALLOWANCE_START
  };
};

const getEmployeeAllowanceDetailSuccess = employeeallowance => {
  return {
    type: GET_EMPLOYEE_ALLOWANCE_SUCCESS,
    employeeallowance
  };
};

const getEmployeeAllowanceDetailFail = error => {
  return {
    type: GET_EMPLOYEE_ALLOWANCE_FAIL,
    error: error
  };
};

export const getEmployeeAllowances = (token) => {
  return dispatch => {
      dispatch(getEmployeeAllowanceListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(employeeallowancesURL, headers)
        .then(res => {
          const employeeallowances = res.data;
          dispatch(getEmployeeAllowanceListSuccess(employeeallowances));
          })
        .catch(err => {
          dispatch(getEmployeeAllowanceListStart(err));
        });
    };
};

export const getEmployeeAllowance = (id, token) => {
  return dispatch => {
      dispatch(getEmployeeAllowanceDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${employeeallowancesURL}${id}`, headers)
        .then(res => {
          const employeeallowance = res.data;
          dispatch(getEmployeeAllowanceDetailSuccess(employeeallowance));
          })
        .catch(err => {
          dispatch(getEmployeeAllowanceDetailFail(err));
        });
    };
};

export const addEmployeeAllowance = (employeeallowance, token) => {
  return dispatch => {
      dispatch(createEmployeeAllowanceStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(employeeallowancesURL, employeeallowance, headers)
        .then(res => {
          dispatch(createEmployeeAllowanceSuccess(employeeallowance));
        })
        .catch(err => {
          dispatch(createEmployeeAllowanceFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editEmployeeAllowance = (id, employeeallowance, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${employeeallowancesURL}${id}/`, employeeallowance, headers)
    .then(res => {
        dispatch({
            type: EDIT_EMPLOYEE_ALLOWANCE,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
