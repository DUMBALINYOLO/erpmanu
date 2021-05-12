import { 
    GET_EMPLOYEE_PAYROLL_SCHEDULES_START,
    GET_EMPLOYEE_PAYROLL_SCHEDULES_SUCCESS,
    GET_EMPLOYEE_PAYROLL_SCHEDULES_FAIL,
    CREATE_EMPLOYEE_PAYROLL_SCHEDULE_START,
    CREATE_EMPLOYEE_PAYROLL_SCHEDULE_SUCCESS,
    CREATE_EMPLOYEE_PAYROLL_SCHEDULE_FAIL,
    GET_EMPLOYEE_PAYROLL_SCHEDULE_START,
    GET_EMPLOYEE_PAYROLL_SCHEDULE_SUCCESS,
    GET_EMPLOYEE_PAYROLL_SCHEDULE_FAIL,
    EDIT_EMPLOYEE_PAYROLL_SCHEDULE
} from '../types/employeepayrollscheduleTypes';
import { updateObject } from "../utility";

const initialState = {
    employeepayrollschedules: [],
    employeepayrollschedule: {},
    loading: false,
    error: null,
}

const getEmployeePayrollScheduleListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeePayrollScheduleListSuccess = (state, action) => {
  return updateObject(state, {
    employeepayrollschedules: action.employeepayrollschedules,
    error: null,
    loading: false
  });
};

const getEmployeePayrollScheduleListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createEmployeePayrollScheduleStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createEmployeePayrollScheduleSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createEmployeePayrollScheduleFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getEmployeePayrollScheduleDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeePayrollScheduleDetailSuccess = (state, action) => {
  return updateObject(state, {
    employeepayrollschedule: action.employeepayrollschedule,
    error: null,
    loading: false
  });
};

const getEmployeePayrollScheduleDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function employeepayrollschedules(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_PAYROLL_SCHEDULES_START:
            return getEmployeePayrollScheduleListStart(state, action);
        case GET_EMPLOYEE_PAYROLL_SCHEDULES_SUCCESS:
            return getEmployeePayrollScheduleListSuccess(state, action);
        case GET_EMPLOYEE_PAYROLL_SCHEDULES_FAIL:
            return getEmployeePayrollScheduleListFail(state, action);
        case CREATE_EMPLOYEE_PAYROLL_SCHEDULE_START:
            return createEmployeePayrollScheduleStart(state, action);
        case CREATE_EMPLOYEE_PAYROLL_SCHEDULE_SUCCESS:
            return createEmployeePayrollScheduleSuccess(state, action);
        case CREATE_EMPLOYEE_PAYROLL_SCHEDULE_FAIL:
            return createEmployeePayrollScheduleFail(state, action);
        case GET_EMPLOYEE_PAYROLL_SCHEDULE_START:
        return getEmployeePayrollScheduleDetailStart(state, action);
        case GET_EMPLOYEE_PAYROLL_SCHEDULE_SUCCESS:
            return getEmployeePayrollScheduleDetailSuccess(state, action);
        case GET_EMPLOYEE_PAYROLL_SCHEDULE_FAIL:
            return getEmployeePayrollScheduleDetailFail(state, action);
        case EDIT_EMPLOYEE_PAYROLL_SCHEDULE:
            const arrayList = state.employeepayrollschedules;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeepayrollschedules: arrayList,
            };
        default:
            return state;
    }
}
