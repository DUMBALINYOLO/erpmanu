import { 
    GET_EMPLOYEES_START,
    GET_EMPLOYEES_SUCCESS,
    GET_EMPLOYEES_FAIL,
    CREATE_EMPLOYEE_START,
    CREATE_EMPLOYEE_SUCCESS,
    CREATE_EMPLOYEE_FAIL,
    GET_EMPLOYEE_START,
    GET_EMPLOYEE_SUCCESS,
    GET_EMPLOYEE_FAIL,
    EDIT_EMPLOYEE 
} from '../types/employeesTypes';
import { updateObject } from "../utility";

const initialState = {
    employees: [],
    employee: {},
    loading: false,
    error: null,
}

const getEmployeeListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeeListSuccess = (state, action) => {
  return updateObject(state, {
    employees: action.employees,
    error: null,
    loading: false
  });
};

const getEmployeeListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createEmployeeStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createEmployeeSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createEmployeeFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getEmployeeDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeeDetailSuccess = (state, action) => {
  return updateObject(state, {
    employee: action.employee,
    error: null,
    loading: false
  });
};

const getEmployeeDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function employees(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEES_START:
            return getEmployeeListStart(state, action);
        case GET_EMPLOYEES_SUCCESS:
            return getEmployeeListSuccess(state, action);
        case GET_EMPLOYEES_FAIL:
            return getEmployeeListFail(state, action);
        case CREATE_EMPLOYEE_START:
            return createEmployeeStart(state, action);
        case CREATE_EMPLOYEE_SUCCESS:
            return createEmployeeSuccess(state, action);
        case CREATE_EMPLOYEE_FAIL:
            return createEmployeeFail(state, action);
        case GET_EMPLOYEE_START:
        return getEmployeeDetailStart(state, action);
        case GET_EMPLOYEE_SUCCESS:
            return getEmployeeDetailSuccess(state, action);
        case GET_EMPLOYEE_FAIL:
            return getEmployeeDetailFail(state, action);
        case EDIT_EMPLOYEE:
            const arrayList = state.employees;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employees: arrayList,
            };
        default:
            return state;
    }
}

