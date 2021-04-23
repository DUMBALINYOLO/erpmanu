import axios from 'axios';
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
import { employeepayrollschedulesURL } from '../constants';

//employee payroll schedules
const getEmployeePayrollScheduleListStart = () => {
  return {
    type: GET_EMPLOYEE_PAYROLL_SCHEDULES_START
  };
};

const getEmployeePayrollScheduleListSuccess = employeepayrollschedules => {
  return {
    type: GET_EMPLOYEE_PAYROLL_SCHEDULES_SUCCESS,
    employeepayrollschedules
  };
};

const getEmployeePayrollScheduleListFail = error => {
  return {
    type: GET_EMPLOYEE_PAYROLL_SCHEDULES_FAIL,
    error: error
  };
};

const createEmployeePayrollScheduleStart = () => {
  return {
    type: CREATE_EMPLOYEE_PAYROLL_SCHEDULE_START
  };
};

const createEmployeePayrollScheduleSuccess = employeepayrollschedule => {
  return {
    type: CREATE_EMPLOYEE_PAYROLL_SCHEDULE_SUCCESS,
    employeepayrollschedule
  };
};

const createEmployeePayrollScheduleFail = error => {
  return {
    type: CREATE_EMPLOYEE_PAYROLL_SCHEDULE_FAIL,
    error: error
  };
};

const getEmployeePayrollScheduleDetailStart = () => {
  return {
    type: GET_EMPLOYEE_PAYROLL_SCHEDULE_START
  };
};

const getEmployeePayrollScheduleDetailSuccess = employeepayrollschedule => {
  return {
    type: GET_EMPLOYEE_PAYROLL_SCHEDULE_SUCCESS,
    employeepayrollschedule
  };
};

const getEmployeePayrollScheduleDetailFail = error => {
  return {
    type: GET_EMPLOYEE_PAYROLL_SCHEDULE_FAIL,
    error: error
  };
};

export const getEmployeePayrollSchedules = (token) => {
  return dispatch => {
      dispatch(getEmployeePayrollScheduleListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(employeepayrollschedulesURL, headers)
        .then(res => {
          const employeepayrollschedules = res.data;
          dispatch(getEmployeePayrollScheduleListSuccess(employeepayrollschedules));
          })
        .catch(err => {
          dispatch(getEmployeePayrollScheduleListStart(err));
        });
    };
};

export const getEmployeePayrollSchedule = (id, token) => {
  return dispatch => {
      dispatch(getEmployeePayrollScheduleDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${employeepayrollschedulesURL}${id}`, headers)
        .then(res => {
          const employeepayrollschedule = res.data;
          dispatch(getEmployeePayrollScheduleDetailSuccess(employeepayrollschedule));
          })
        .catch(err => {
          dispatch(getEmployeePayrollScheduleDetailFail(err));
        });
    };
};

export const addEmployeePayrollSchedule = (employeepayrollschedule, token) => {
  return dispatch => {
      dispatch(createEmployeePayrollScheduleStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(employeepayrollschedulesURL, employeepayrollschedule, headers)
        .then(res => {
          dispatch(createEmployeePayrollScheduleSuccess(employeepayrollschedule));
        })
        .catch(err => {
          dispatch(createEmployeePayrollScheduleFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editEmployeePayrollSchedule = (id, employeepayrollschedule, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${employeepayrollschedulesURL}${id}/`, employeepayrollschedule, headers)
    .then(res => {
        dispatch({
            type: EDIT_EMPLOYEE_PAYROLL_SCHEDULE,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
