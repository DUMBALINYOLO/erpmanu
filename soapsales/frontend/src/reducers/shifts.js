import { 
    GET_SHIFTS_START,
    GET_SHIFTS_SUCCESS,
    GET_SHIFTS_FAIL,
    GET_SHIFT_START,
    GET_SHIFT_SUCCESS,
    GET_SHIFT_FAIL,
    CREATE_SHIFT_START,
    CREATE_SHIFT_SUCCESS,
    CREATE_SHIFT_FAIL,
    EDIT_SHIFT
} from '../types/shiftTypes';
import { updateObject } from "../utility";

const initialState = {
    shifts: [],
    shift: {},
    loading: false,
    error: null,
}

const getShiftListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getShiftListSuccess = (state, action) => {
  return updateObject(state, {
    shifts: action.shifts,
    error: null,
    loading: false
  });
};

const getShiftListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createShiftStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createShiftSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createShiftFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getShiftDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getShiftDetailSuccess = (state, action) => {
  return updateObject(state, {
    shift: action.shift,
    error: null,
    loading: false
  });
};

const getShiftDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function shifts(state = initialState, action){
    switch(action.type){
        case GET_SHIFTS_START:
            return getShiftListStart(state, action);
        case GET_SHIFTS_SUCCESS:
            return getShiftListSuccess(state, action);
        case GET_SHIFTS_FAIL:
            return getShiftListFail(state, action);
        case GET_SHIFT_START:
            return getShiftDetailStart(state, action);
        case GET_SHIFT_SUCCESS:
            return getShiftDetailSuccess(state, action);
        case GET_SHIFT_FAIL:
            return getShiftDetailFail(state, action);
        case CREATE_SHIFT_START:
            return createShiftStart(state, action);
        case CREATE_SHIFT_SUCCESS:
            return createShiftSuccess(state, action);
        case CREATE_SHIFT_FAIL:
            return createShiftFail(state, action);
        case EDIT_SHIFT:
            const arrayList = state.shifts;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                shifts: arrayList,
            };
        default:
            return state;
    }
}
