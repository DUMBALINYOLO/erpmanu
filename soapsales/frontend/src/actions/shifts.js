import axios from 'axios';
import { 
    GET_SHIFTS_START,
    GET_SHIFTS_SUCCESS,
    GET_SHIFTS_FAIL,
    CREATE_SHIFT_START,
    CREATE_SHIFT_SUCCESS,
    CREATE_SHIFT_FAIL,
    GET_SHIFT_START,
    GET_SHIFT_SUCCESS,
    GET_SHIFT_FAIL,
    EDIT_SHIFT 
} from '../types/shiftTypes';
import { shiftsURL } from '../constants';

//shifts
const getShiftListStart = () => {
  return {
    type: GET_SHIFTS_START
  };
};

const getShiftListSuccess = shifts => {
  return {
    type: GET_SHIFTS_SUCCESS,
    shifts
  };
};

const getShiftListFail = error => {
  return {
    type: GET_SHIFTS_FAIL,
    error: error
  };
};

const createShiftStart = () => {
  return {
    type: CREATE_SHIFT_START
  };
};

const createShiftSuccess = shift => {
  return {
    type: CREATE_SHIFT_SUCCESS,
    shift
  };
};

const createShiftFail = error => {
  return {
    type: CREATE_SHIFT_FAIL,
    error: error
  };
};

const getShiftDetailStart = () => {
  return {
    type: GET_SHIFT_START
  };
};

const getShiftDetailSuccess = shift => {
  return {
    type: GET_SHIFT_SUCCESS,
    shift
  };
};

const getShiftDetailFail = error => {
  return {
    type: GET_SHIFT_FAIL,
    error: error
  };
};

export const getShifts = (token) => {
  return dispatch => {
      dispatch(getShiftListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(shiftsURL, headers)
        .then(res => {
          const shifts = res.data;
          dispatch(getShiftListSuccess(shifts));
          })
        .catch(err => {
          dispatch(getShiftListStart(err));
        });
    };
};

export const getShift = (id, token) => {
  return dispatch => {
      dispatch(getShiftDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${shiftsURL}${id}`, headers)
        .then(res => {
          const shift = res.data;
          dispatch(getShiftDetailSuccess(shift));
          })
        .catch(err => {
          dispatch(getShiftDetailFail(err));
        });
    };
};

export const addShift = (shift, token) => {
  return dispatch => {
      dispatch(createShiftStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(shiftsURL, shift, headers)
        .then(res => {
          dispatch(createShiftSuccess(shift));
        })
        .catch(err => {
          dispatch(createShiftFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editShift = (id, shift, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${shiftsURL}${id}/`, shift, headers)
    .then(res => {
        dispatch({
            type: EDIT_SHIFT,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
