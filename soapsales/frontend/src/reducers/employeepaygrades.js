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
import { updateObject } from "../utility";

const initialState = {
    employeepaygrades: [],
    employeepaygrade: {},
    loading: false,
    error: null,
}

const getEmployeePayGradeListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeePayGradeListSuccess = (state, action) => {
  return updateObject(state, {
    employeepaygrades: action.employeepaygrades,
    error: null,
    loading: false
  });
};

const getEmployeePayGradeListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createEmployeePayGradeStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createEmployeePayGradeSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createEmployeePayGradeFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getEmployeePayGradeDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeePayGradeDetailSuccess = (state, action) => {
  return updateObject(state, {
    employeepaygrade: action.employeepaygrade,
    error: null,
    loading: false
  });
};

const getEmployeePayGradeDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function employeepaygrades(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_PAYGRADES_START:
            return getEmployeePayGradeListStart(state, action);
        case GET_EMPLOYEE_PAYGRADES_SUCCESS:
            return getEmployeePayGradeListSuccess(state, action);
        case GET_EMPLOYEE_PAYGRADES_FAIL:
            return getEmployeePayGradeListFail(state, action);
        case CREATE_EMPLOYEE_PAYGRADE_START:
            return createEmployeePayGradeStart(state, action);
        case CREATE_EMPLOYEE_PAYGRADE_SUCCESS:
            return createEmployeePayGradeSuccess(state, action);
        case CREATE_EMPLOYEE_PAYGRADE_FAIL:
            return createEmployeePayGradeFail(state, action);
        case GET_EMPLOYEE_PAYGRADE_START:
        return getEmployeePayGradeDetailStart(state, action);
        case GET_EMPLOYEE_PAYGRADE_SUCCESS:
            return getEmployeePayGradeDetailSuccess(state, action);
        case GET_EMPLOYEE_PAYGRADE_FAIL:
            return getEmployeePayGradeDetailFail(state, action);
        case EDIT_EMPLOYEE_PAYGRADE:
            const arrayList = state.employeepaygrades;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeepaygrades: arrayList,
            };
        default:
            return state;
    }
}
