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
import { updateObject } from "../utility";

const initialState = {
    employeecontractsterminations: [],
    employeecontractstermination: {},
    loading: false,
    error: null,
}

const getEmployeeContractsTerminationListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeeContractsTerminationListSuccess = (state, action) => {
  return updateObject(state, {
    employeecontractsterminations: action.employeecontractsterminations,
    error: null,
    loading: false
  });
};

const getEmployeeContractsTerminationListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createEmployeeContractsTerminationStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createEmployeeContractsTerminationSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createEmployeeContractsTerminationFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getEmployeeContractsTerminationDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeeContractsTerminationDetailSuccess = (state, action) => {
  return updateObject(state, {
    employeecontractstermination: action.employeecontractstermination,
    error: null,
    loading: false
  });
};

const getEmployeeContractsTerminationDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function employeecontractsterminations(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_CONTRACTS_TERMINATIONS_START:
            return getEmployeeContractsTerminationListStart(state, action);
        case GET_EMPLOYEE_CONTRACTS_TERMINATIONS_SUCCESS:
            return getEmployeeContractsTerminationListSuccess(state, action);
        case GET_EMPLOYEE_CONTRACTS_TERMINATIONS_FAIL:
            return getEmployeeContractsTerminationListFail(state, action);
        case CREATE_EMPLOYEE_CONTRACTS_TERMINATION_START:
            return createEmployeeContractsTerminationStart(state, action);
        case CREATE_EMPLOYEE_CONTRACTS_TERMINATION_SUCCESS:
            return createEmployeeContractsTerminationSuccess(state, action);
        case CREATE_EMPLOYEE_CONTRACTS_TERMINATION_FAIL:
            return createEmployeeContractsTerminationFail(state, action);
        case GET_EMPLOYEE_CONTRACTS_TERMINATION_START:
        return getEmployeeContractsTerminationDetailStart(state, action);
        case GET_EMPLOYEE_CONTRACTS_TERMINATION_SUCCESS:
            return getEmployeeContractsTerminationDetailSuccess(state, action);
        case GET_EMPLOYEE_CONTRACTS_TERMINATION_FAIL:
            return getEmployeeContractsTerminationDetailFail(state, action);
        case EDIT_EMPLOYEE_CONTRACTS_TERMINATION:
            const arrayList = state.employeecontractsterminations;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeecontractsterminations: arrayList,
            };
        default:
            return state;
    }
}
