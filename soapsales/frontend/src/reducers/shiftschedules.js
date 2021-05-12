import { 
    GET_SHIFT_SCHEDULES_START,
    GET_SHIFT_SCHEDULES_SUCCESS,
    GET_SHIFT_SCHEDULES_FAIL,
    GET_SHIFT_SCHEDULE_START,
    GET_SHIFT_SCHEDULE_SUCCESS,
    GET_SHIFT_SCHEDULE_FAIL,
    CREATE_SHIFT_SCHEDULE_START,
    CREATE_SHIFT_SCHEDULE_SUCCESS,
    CREATE_SHIFT_SCHEDULE_FAIL,
    EDIT_SHIFT_SCHEDULE
} from '../types/shiftscheduleTypes';
import { updateObject } from "../utility";

const initialState = {
    shiftschedules: [],
    shiftschedule: {},
    loading: false,
    error: null,
}

const getShiftScheduleListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getShiftScheduleListSuccess = (state, action) => {
  return updateObject(state, {
    shiftschedules: action.shiftschedules,
    error: null,
    loading: false
  });
};

const getShiftScheduleListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createShiftScheduleStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createShiftScheduleSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createShiftScheduleFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getShiftScheduleDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getShiftScheduleDetailSuccess = (state, action) => {
  return updateObject(state, {
    shiftschedule: action.shiftschedule,
    error: null,
    loading: false
  });
};

const getShiftScheduleDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function shiftschedules(state = initialState, action){
    switch(action.type){
        case GET_SHIFT_SCHEDULES_START:
            return getShiftScheduleListStart(state, action);
        case GET_SHIFT_SCHEDULES_SUCCESS:
            return getShiftScheduleListSuccess(state, action);
        case GET_SHIFT_SCHEDULES_FAIL:
            return getShiftScheduleListFail(state, action);
        case GET_SHIFT_SCHEDULE_START:
            return getShiftScheduleDetailStart(state, action);
        case GET_SHIFT_SCHEDULE_SUCCESS:
            return getShiftScheduleDetailSuccess(state, action);
        case GET_SHIFT_SCHEDULE_FAIL:
            return getShiftScheduleDetailFail(state, action);
        case CREATE_SHIFT_SCHEDULE_START:
            return createShiftScheduleStart(state, action);
        case CREATE_SHIFT_SCHEDULE_SUCCESS:
            return createShiftScheduleSuccess(state, action);
        case CREATE_SHIFT_SCHEDULE_FAIL:
            return createShiftScheduleFail(state, action);
        case EDIT_SHIFT_SCHEDULE:
            const arrayList = state.shiftschedules;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                shiftschedules: arrayList,
            };
        default:
            return state;
    }
}
