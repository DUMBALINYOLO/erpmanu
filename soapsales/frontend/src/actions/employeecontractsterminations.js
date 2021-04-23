import axios from 'axios';
import { 
    GET_EMPLOYEE_CONTRACTS_TERMINATIONS_START,
    GET_EMPLOYEE_CONTRACTS_TERMINATIONS_SUCCESS,
    GET_EMPLOYEE_CONTRACTS_TERMINATIONS_FAIL,
    CREATE_EMPLOYEE_CONTRACTS_TERMINATION_START,
    CREATE_EMPLOYEE_CONTRACTS_TERMINATION_SUCCESS,
    CREATE_EMPLOYEE_CONTRACTS_TERMINATION_FAIL,
    GET_EMPLOYEE_CONTRACTS_TERMINATION_START,
    GET_EMPLOYEE_CONTRACTS_TERMINATION_SUCCESS,
    GET_EMPLOYEE_CONTRACTS_TERMINATION_FAIL,
    EDIT_EMPLOYEE_CONTRACTS_TERMINATION 
} from '../types/employeecontractsterminationTypes';
import { employeecontractsterminationsURL } from '../constants';

//employee contracts terminations
const getEmployeeContractsTerminationListStart = () => {
  return {
    type: GET_EMPLOYEE_CONTRACTS_TERMINATIONS_START
  };
};

const getEmployeeContractsTerminationListSuccess = employeecontractsterminations => {
  return {
    type: GET_EMPLOYEE_CONTRACTS_TERMINATIONS_SUCCESS,
    employeecontractsterminations
  };
};

const getEmployeeContractsTerminationListFail = error => {
  return {
    type: GET_EMPLOYEE_CONTRACTS_TERMINATIONS_FAIL,
    error: error
  };
};

const createEmployeeContractsTerminationStart = () => {
  return {
    type: CREATE_EMPLOYEE_CONTRACTS_TERMINATION_START
  };
};


const createEmployeeContractsTerminationSuccess = employeecontractstermination => {
  return {
    type: CREATE_EMPLOYEE_CONTRACTS_TERMINATION_SUCCESS,
    employeecontractstermination
  };
};

const createEmployeeContractsTerminationFail = error => {
  return {
    type: CREATE_EMPLOYEE_CONTRACTS_TERMINATION_FAIL,
    error: error
  };
};

const getEmployeeContractsTerminationDetailStart = () => {
  return {
    type: GET_EMPLOYEE_CONTRACTS_TERMINATION_START
  };
};

const getEmployeeContractsTerminationDetailSuccess = employeecontractstermination => {
  return {
    type: GET_EMPLOYEE_CONTRACTS_TERMINATION_SUCCESS,
    employeecontractstermination
  };
};

const getEmployeeContractsTerminationDetailFail = error => {
  return {
    type: GET_EMPLOYEE_CONTRACTS_TERMINATION_FAIL,
    error: error
  };
};

export const getEmployeeContractsTerminations = (token) => {
  return dispatch => {
      dispatch(getEmployeeContractsTerminationListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(employeecontractsterminationsURL, headers)
        .then(res => {
          const employeecontractsterminations = res.data;
          dispatch(getEmployeeContractsTerminationListSuccess(employeecontractsterminations));
          })
        .catch(err => {
          dispatch(getEmployeeContractsTerminationListStart(err));
        });
    };
};

export const getEmployeeContractsTermination = (id, token) => {
  return dispatch => {
      dispatch(getEmployeeContractsTerminationDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${employeecontractsterminationsURL}${id}`, headers)
        .then(res => {
          const employeecontractstermination = res.data;
          dispatch(getEmployeeContractsTerminationDetailSuccess(employeecontractstermination));
          })
        .catch(err => {
          dispatch(getEmployeeContractsTerminationDetailFail(err));
        });
    };
};

export const addEmployeeContractsTermination = (employeecontractstermination, token) => {
  return dispatch => {
      dispatch(createEmployeeContractsTerminationStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(employeecontractsterminationsURL, employeecontractstermination, headers)
        .then(res => {
          dispatch(createEmployeeContractsTerminationSuccess(employeecontractstermination));
        })
        .catch(err => {
          dispatch(createEmployeeContractsTerminationFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editEmployeeContractsTermination = (id, employeecontractstermination, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${employeecontractsterminationsURL}${id}/`, employeecontractstermination, headers)
    .then(res => {
        dispatch({
            type: EDIT_EMPLOYEE_CONTRACTS_TERMINATION,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
