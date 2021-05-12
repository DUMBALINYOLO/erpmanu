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
import { updateObject } from "../utility";

const initialState = {
    employeeallowances: [],
    employeeallowance: {},
    loading: false,
    error: null,
}

const getEmployeeAllowanceListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeeAllowanceListSuccess = (state, action) => {
  return updateObject(state, {
    employeeallowances: action.employeeallowances,
    error: null,
    loading: false
  });
};

const getEmployeeAllowanceListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createEmployeeAllowanceStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createEmployeeAllowanceSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createEmployeeAllowanceFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getEmployeeAllowanceDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeeAllowanceDetailSuccess = (state, action) => {
  return updateObject(state, {
    employeeallowance: action.employeeallowance,
    error: null,
    loading: false
  });
};

const getEmployeeAllowanceDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function employeeallowances(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_ALLOWANCES_START:
            return getEmployeeAllowanceListStart(state, action);
        case GET_EMPLOYEE_ALLOWANCES_SUCCESS:
            return getEmployeeAllowanceListSuccess(state, action);
        case GET_EMPLOYEE_ALLOWANCES_FAIL:
            return getEmployeeAllowanceListFail(state, action);
        case CREATE_EMPLOYEE_ALLOWANCE_START:
            return createEmployeeAllowanceStart(state, action);
        case CREATE_EMPLOYEE_ALLOWANCE_SUCCESS:
            return createEmployeeAllowanceSuccess(state, action);
        case CREATE_EMPLOYEE_ALLOWANCE_FAIL:
            return createEmployeeAllowanceFail(state, action);
        case GET_EMPLOYEE_ALLOWANCE_START:
        return getEmployeeAllowanceDetailStart(state, action);
        case GET_EMPLOYEE_ALLOWANCE_SUCCESS:
            return getEmployeeAllowanceDetailSuccess(state, action);
        case GET_EMPLOYEE_ALLOWANCE_FAIL:
            return getEmployeeAllowanceDetailFail(state, action);
        case EDIT_EMPLOYEE_ALLOWANCE:
            const arrayList = state.employeeallowances;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeeallowances: arrayList,
            };
        default:
            return state;
    }
}
