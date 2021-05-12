import { 
    GET_EMPLOYEE_ATTENDANCE_TIMESHEETS_START,
    GET_EMPLOYEE_ATTENDANCE_TIMESHEETS_SUCCESS,
    GET_EMPLOYEE_ATTENDANCE_TIMESHEETS_FAIL,
    CREATE_EMPLOYEE_ATTENDANCE_TIMESHEET_START,
    CREATE_EMPLOYEE_ATTENDANCE_TIMESHEET_SUCCESS,
    CREATE_EMPLOYEE_ATTENDANCE_TIMESHEET_FAIL,
    GET_EMPLOYEE_ATTENDANCE_TIMESHEET_START,
    GET_EMPLOYEE_ATTENDANCE_TIMESHEET_SUCCESS,
    GET_EMPLOYEE_ATTENDANCE_TIMESHEET_FAIL,
    EDIT_EMPLOYEE_ATTENDANCE_TIMESHEET 
} from '../types/employeeattendancetimesheetTypes';
import { updateObject } from "../utility";

const initialState = {
    employeeattendancetimesheets: [],
    employeeattendancetimesheet: {},
    loading: false,
    error: null,
}

const getEmployeeAttendanceTimeSheetListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeeAttendanceTimeSheetListSuccess = (state, action) => {
  return updateObject(state, {
    employeeattendancetimesheets: action.employeeattendancetimesheets,
    error: null,
    loading: false
  });
};

const getEmployeeAttendanceTimeSheetListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createEmployeeAttendanceTimeSheetStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createEmployeeAttendanceTimeSheetSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createEmployeeAttendanceTimeSheetFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getEmployeeAttendanceTimeSheetDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeeAttendanceTimeSheetDetailSuccess = (state, action) => {
  return updateObject(state, {
    employeeattendancetimesheet: action.employeeattendancetimesheet,
    error: null,
    loading: false
  });
};

const getEmployeeAttendanceTimeSheetDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function employeeattendancetimesheets(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_ATTENDANCE_TIMESHEETS_START:
            return getEmployeeAttendanceTimeSheetListStart(state, action);
        case GET_EMPLOYEE_ATTENDANCE_TIMESHEETS_SUCCESS:
            return getEmployeeAttendanceTimeSheetListSuccess(state, action);
        case GET_EMPLOYEE_ATTENDANCE_TIMESHEETS_FAIL:
            return getEmployeeAttendanceTimeSheetListFail(state, action);
        case CREATE_EMPLOYEE_ATTENDANCE_TIMESHEET_START:
            return createEmployeeAttendanceTimeSheetStart(state, action);
        case CREATE_EMPLOYEE_ATTENDANCE_TIMESHEET_SUCCESS:
            return createEmployeeAttendanceTimeSheetSuccess(state, action);
        case CREATE_EMPLOYEE_ATTENDANCE_TIMESHEET_FAIL:
            return createEmployeeAttendanceTimeSheetFail(state, action);
        case GET_EMPLOYEE_ATTENDANCE_TIMESHEET_START:
        return getEmployeeAttendanceTimeSheetDetailStart(state, action);
        case GET_EMPLOYEE_ATTENDANCE_TIMESHEET_SUCCESS:
            return getEmployeeAttendanceTimeSheetDetailSuccess(state, action);
        case GET_EMPLOYEE_ATTENDANCE_TIMESHEET_FAIL:
            return getEmployeeAttendanceTimeSheetDetailFail(state, action);
        case EDIT_EMPLOYEE_ATTENDANCE_TIMESHEET:
            const arrayList = state.employeeattendancetimesheets;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeeattendancetimesheets: arrayList,
            };
        default:
            return state;
    }
}
