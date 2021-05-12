import { 
    GET_EMPLOYEE_DEPARTMENTS_START,
    GET_EMPLOYEE_DEPARTMENTS_SUCCESS,
    GET_EMPLOYEE_DEPARTMENTS_FAIL,
    CREATE_EMPLOYEE_DEPARTMENT_START,
    CREATE_EMPLOYEE_DEPARTMENT_SUCCESS,
    CREATE_EMPLOYEE_DEPARTMENT_FAIL,
    GET_EMPLOYEE_DEPARTMENT_START,
    GET_EMPLOYEE_DEPARTMENT_SUCCESS,
    GET_EMPLOYEE_DEPARTMENT_FAIL,
    EDIT_EMPLOYEE_DEPARTMENT 
} from '../types/employeedepartmentTypes';
import { updateObject } from "../utility";

const initialState = {
    employeedepartments: [],
    employeedepartment: {},
    loading: false,
    error: null,
}

const getEmployeeDepartmentListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeeDepartmentListSuccess = (state, action) => {
  return updateObject(state, {
    employeedepartments: action.employeedepartments,
    error: null,
    loading: false
  });
};

const getEmployeeDepartmentListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createEmployeeDepartmentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createEmployeeDepartmentSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createEmployeeDepartmentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getEmployeeDepartmentDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeeDepartmentDetailSuccess = (state, action) => {
  return updateObject(state, {
    employeedepartment: action.employeedepartment,
    error: null,
    loading: false
  });
};

const getEmployeeDepartmentDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function employeedepartments(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_DEPARTMENTS_START:
            return getEmployeeDepartmentListStart(state, action);
        case GET_EMPLOYEE_DEPARTMENTS_SUCCESS:
            return getEmployeeDepartmentListSuccess(state, action);
        case GET_EMPLOYEE_DEPARTMENTS_FAIL:
            return getEmployeeDepartmentListFail(state, action);
        case CREATE_EMPLOYEE_DEPARTMENT_START:
            return createEmployeeDepartmentStart(state, action);
        case CREATE_EMPLOYEE_DEPARTMENT_SUCCESS:
            return createEmployeeDepartmentSuccess(state, action);
        case CREATE_EMPLOYEE_DEPARTMENT_FAIL:
            return createEmployeeDepartmentFail(state, action);
        case GET_EMPLOYEE_DEPARTMENT_START:
        return getEmployeeDepartmentDetailStart(state, action);
        case GET_EMPLOYEE_DEPARTMENT_SUCCESS:
            return getEmployeeDepartmentDetailSuccess(state, action);
        case GET_EMPLOYEE_DEPARTMENT_FAIL:
            return getEmployeeDepartmentDetailFail(state, action);
        case EDIT_EMPLOYEE_DEPARTMENT:
            const arrayList = state.employeedepartments;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeedepartments: arrayList,
            };
        default:
            return state;
    }
}
