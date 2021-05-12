import axios from 'axios';
import { 
    GET_SHIFT_SCHEDULES_START,
    GET_SHIFT_SCHEDULES_SUCCESS,
    GET_SHIFT_SCHEDULES_FAIL,
    CREATE_SHIFT_SCHEDULE_START,
    CREATE_SHIFT_SCHEDULE_SUCCESS,
    CREATE_SHIFT_SCHEDULE_FAIL,
    GET_SHIFT_SCHEDULE_START,
    GET_SHIFT_SCHEDULE_SUCCESS,
    GET_SHIFT_SCHEDULE_FAIL,
    EDIT_SHIFT_SCHEDULE 
} from '../types/shiftscheduleTypes';
import { shiftschedulesURL } from '../constants';

//shift schedules
const getShiftScheduleListStart = () => {
  return {
    type: GET_SHIFT_SCHEDULES_START
  };
};

const getShiftScheduleListSuccess = shiftschedules => {
  return {
    type: GET_SHIFT_SCHEDULES_SUCCESS,
    shiftschedules
  };
};

const getShiftScheduleListFail = error => {
  return {
    type: GET_SHIFT_SCHEDULES_FAIL,
    error: error
  };
};

const createShiftScheduleStart = () => {
  return {
    type: CREATE_SHIFT_SCHEDULE_START
  };
};


const createShiftScheduleSuccess = shiftschedule => {
  return {
    type: CREATE_SHIFT_SCHEDULE_SUCCESS,
    shiftschedule
  };
};

const createShiftScheduleFail = error => {
  return {
    type: CREATE_SHIFT_SCHEDULE_FAIL,
    error: error
  };
};

const getShiftScheduleDetailStart = () => {
  return {
    type: GET_SHIFT_SCHEDULE_START
  };
};

const getShiftScheduleDetailSuccess = shiftschedule => {
  return {
    type: GET_SHIFT_SCHEDULE_SUCCESS,
    shiftschedule
  };
};

const getShiftScheduleDetailFail = error => {
  return {
    type: GET_SHIFT_SCHEDULE_FAIL,
    error: error
  };
};

export const getShiftSchedules = (token) => {
  return dispatch => {
      dispatch(getShiftScheduleListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(shiftschedulesURL, headers)
        .then(res => {
          const shiftschedules = res.data;
          dispatch(getShiftScheduleListSuccess(shiftschedules));
          })
        .catch(err => {
          dispatch(getShiftScheduleListStart(err));
        });
    };
};

export const getShiftSchedule = (id, token) => {
  return dispatch => {
      dispatch(getShiftScheduleDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${shiftschedulesURL}${id}`, headers)
        .then(res => {
          const shiftschedule = res.data;
          dispatch(getShiftScheduleDetailSuccess(shiftschedule));
          })
        .catch(err => {
          dispatch(getShiftScheduleDetailFail(err));
        });
    };
};

export const addShiftSchedule = (shiftschedule, token) => {
  return dispatch => {
      dispatch(createShiftScheduleStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(shiftschedulesURL, shiftschedule, headers)
        .then(res => {
          dispatch(createShiftScheduleSuccess(shiftschedule));
        })
        .catch(err => {
          dispatch(createShiftScheduleFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editShiftSchedule = (id, shiftschedule, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${shiftschedulesURL}${id}/`, shiftschedule, headers)
    .then(res => {
        dispatch({
            type: EDIT_SHIFT_SCHEDULE,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
