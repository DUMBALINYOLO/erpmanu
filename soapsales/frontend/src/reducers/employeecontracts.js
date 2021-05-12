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
import { updateObject } from "../utility";

const initialState = {
    employeecontracts: [],
    employeecontract: {},
    loading: false,
    error: null,
}

const getEmployeeContractListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeeContractListSuccess = (state, action) => {
  return updateObject(state, {
    employeecontracts: action.employeecontracts,
    error: null,
    loading: false
  });
};

const getEmployeeContractListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createEmployeeContractStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createEmployeeContractSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createEmployeeContractFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getEmployeeContractDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeeContractDetailSuccess = (state, action) => {
  return updateObject(state, {
    employeecontract: action.employeecontract,
    error: null,
    loading: false
  });
};

const getEmployeeContractDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function employeecontracts(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_CONTRACTS_START:
            return getEmployeeContractListStart(state, action);
        case GET_EMPLOYEE_CONTRACTS_SUCCESS:
            return getEmployeeContractListSuccess(state, action);
        case GET_EMPLOYEE_CONTRACTS_FAIL:
            return getEmployeeContractListFail(state, action);
        case CREATE_EMPLOYEE_CONTRACT_START:
            return createEmployeeContractStart(state, action);
        case CREATE_EMPLOYEE_CONTRACT_SUCCESS:
            return createEmployeeContractSuccess(state, action);
        case CREATE_EMPLOYEE_CONTRACT_FAIL:
            return createEmployeeContractFail(state, action);
        case GET_EMPLOYEE_CONTRACT_START:
        return getEmployeeContractDetailStart(state, action);
        case GET_EMPLOYEE_CONTRACT_SUCCESS:
            return getEmployeeContractDetailSuccess(state, action);
        case GET_EMPLOYEE_CONTRACT_FAIL:
            return getEmployeeContractDetailFail(state, action);
        case EDIT_EMPLOYEE_CONTRACT:
            const arrayList = state.employeecontracts;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeecontracts: arrayList,
            };
        default:
            return state;
    }
}
