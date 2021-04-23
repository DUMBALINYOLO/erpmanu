import axios from 'axios';
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
import { employeeattendancetimesheetsURL } from '../constants';

//employee attendance timesheets
const getEmployeeAttendanceTimesheetListStart = () => {
  return {
    type: GET_EMPLOYEE_ATTENDANCE_TIMESHEETS_START
  };
};

const getEmployeeAttendanceTimesheetListSuccess = employeeattendancetimesheets => {
  return {
    type: GET_EMPLOYEE_ATTENDANCE_TIMESHEETS_SUCCESS,
    employeeattendancetimesheets
  };
};

const getEmployeeAttendanceTimesheetListFail = error => {
  return {
    type: GET_EMPLOYEE_ATTENDANCE_TIMESHEETS_FAIL,
    error: error
  };
};

const createEmployeeAttendanceTimesheetStart = () => {
  return {
    type: CREATE_EMPLOYEE_ATTENDANCE_TIMESHEET_START
  };
};

const createEmployeeAttendanceTimesheetSuccess = employeeattendancetimesheet => {
  return {
    type: CREATE_EMPLOYEE_ATTENDANCE_TIMESHEET_SUCCESS,
    employeeattendancetimesheet
  };
};

const createEmployeeAttendanceTimesheetFail = error => {
  return {
    type: CREATE_EMPLOYEE_ATTENDANCE_TIMESHEET_FAIL,
    error: error
  };
};

const getEmployeeAttendanceTimesheetDetailStart = () => {
  return {
    type: GET_EMPLOYEE_ATTENDANCE_TIMESHEET_START
  };
};

const getEmployeeAttendanceTimesheetDetailSuccess = employeeattendancetimesheet => {
  return {
    type: GET_EMPLOYEE_ATTENDANCE_TIMESHEET_SUCCESS,
    employeeattendancetimesheet
  };
};

const getEmployeeAttendanceTimesheetDetailFail = error => {
  return {
    type: GET_EMPLOYEE_ATTENDANCE_TIMESHEET_FAIL,
    error: error
  };
};

export const getEmployeeAttendanceTimesheets = (token) => {
  return dispatch => {
      dispatch(getEmployeeAttendanceTimesheetListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(employeeattendancetimesheetsURL, headers)
        .then(res => {
          const employeeattendancetimesheets = res.data;
          dispatch(getEmployeeAttendanceTimesheetListSuccess(employeeattendancetimesheets));
          })
        .catch(err => {
          dispatch(getEmployeeAttendanceTimesheetListStart(err));
        });
    };
};

export const getEmployeeAttendanceTimesheet = (id, token) => {
  return dispatch => {
      dispatch(getEmployeeAttendanceTimesheetDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${employeeattendancetimesheetsURL}${id}`, headers)
        .then(res => {
          const employeeattendancetimesheet = res.data;
          dispatch(getEmployeeAttendanceTimesheetDetailSuccess(employeeattendancetimesheet));
          })
        .catch(err => {
          dispatch(getEmployeeAttendanceTimesheetDetailFail(err));
        });
    };
};

export const addEmployeeAttendanceTimesheet = (employeeattendancetimesheet, token) => {
  return dispatch => {
      dispatch(createEmployeeAttendanceTimesheetStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(employeeattendancetimesheetsURL, employeeattendancetimesheet, headers)
        .then(res => {
          dispatch(createEmployeeAttendanceTimesheetSuccess(employeeattendancetimesheet));
        })
        .catch(err => {
          dispatch(createEmployeeAttendanceTimesheetFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editEmployeeAttendanceTimesheet = (id, employeeattendancetimesheet, token) => dispatch => {
    const headers ={
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${employeeattendancetimesheetsURL}${id}/`, employeeattendancetimesheet, headers)
    .then(res => {
        dispatch({
            type: EDIT_EMPLOYEE_ATTENDANCE_TIMESHEET,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
