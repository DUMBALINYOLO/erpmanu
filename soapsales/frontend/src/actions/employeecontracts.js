import axios from 'axios';
import { 
    GET_EMPLOYEE_CONTRACTS_START,
    GET_EMPLOYEE_CONTRACTS_SUCCESS,
    GET_EMPLOYEE_CONTRACTS_FAIL,
    CREATE_EMPLOYEE_CONTRACT_START,
    CREATE_EMPLOYEE_CONTRACT_SUCCESS,
    CREATE_EMPLOYEE_CONTRACT_FAIL,
    GET_EMPLOYEE_CONTRACT_START,
    GET_EMPLOYEE_CONTRACT_SUCCESS,
    GET_EMPLOYEE_CONTRACT_FAIL,
    EDIT_EMPLOYEE_CONTRACT
} from '../types/employeecontractTypes';
import { employeecontractsURL } from '../constants';

//employee contracts
const getEmployeeContractListStart = () => {
  return {
    type: GET_EMPLOYEE_CONTRACTS_START
  };
};

const getEmployeeContractListSuccess = employeecontracts => {
  return {
    type: GET_EMPLOYEE_CONTRACTS_SUCCESS,
    employeecontracts
  };
};

const getEmployeeContractListFail = error => {
  return {
    type: GET_EMPLOYEE_CONTRACTS_FAIL,
    error: error
  };
};

const createEmployeeContractStart = () => {
  return {
    type: CREATE_EMPLOYEE_CONTRACT_START
  };
};

const createEmployeeContractSuccess = employeecontract => {
  return {
    type: CREATE_EMPLOYEE_CONTRACT_SUCCESS,
    employeecontract
  };
};

const createEmployeeContractFail = error => {
  return {
    type: CREATE_EMPLOYEE_CONTRACT_FAIL,
    error: error
  };
};

const getEmployeeContractDetailStart = () => {
  return {
    type: GET_EMPLOYEE_CONTRACT_START
  };
};

const getEmployeeContractDetailSuccess = employeecontract => {
  return {
    type: GET_EMPLOYEE_CONTRACT_SUCCESS,
    employeecontract
  };
};

const getEmployeeContractDetailFail = error => {
  return {
    type: GET_EMPLOYEE_CONTRACT_FAIL,
    error: error
  };
};

export const getEmployeeContracts = (token) => {
  return dispatch => {
      dispatch(getEmployeeContractListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(employeecontractsURL, headers)
        .then(res => {
          const employeecontracts = res.data;
          dispatch(getEmployeeContractListSuccess(employeecontracts));
          })
        .catch(err => {
          dispatch(getEmployeeContractListStart(err));
        });
    };
};

export const getEmployeeContract = (id, token) => {
  return dispatch => {
      dispatch(getEmployeeContractDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${employeecontractsURL}${id}`, headers)
        .then(res => {
          const employeecontract = res.data;
          dispatch(getEmployeeContractDetailSuccess(employeecontract));
          })
        .catch(err => {
          dispatch(getEmployeeContractDetailFail(err));
        });
    };
};

export const addEmployeeContract = (employeecontract, token) => {
  return dispatch => {
      dispatch(createEmployeeContractStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(employeecontractsURL, employeecontract, headers)
        .then(res => {
          dispatch(createEmployeeContractSuccess(employeecontract));
        })
        .catch(err => {
          dispatch(createEmployeeContractFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editEmployeeContract = (id, employeecontract, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${employeecontractsURL}${id}/`, employeecontract, headers)
    .then(res => {
        dispatch({
            type: EDIT_EMPLOYEE_CONTRACT,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
