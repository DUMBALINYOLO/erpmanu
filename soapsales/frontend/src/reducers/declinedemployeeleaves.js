import {
    GET_DECLINED_EMPLOYEE_LEAVES_START,
    GET_DECLINED_EMPLOYEE_LEAVES_SUCCESS,
    GET_DECLINED_EMPLOYEE_LEAVES_FAIL,
    CREATE_DECLINED_EMPLOYEE_LEAVE_START,
    CREATE_DECLINED_EMPLOYEE_LEAVE_SUCCESS,
    CREATE_DECLINED_EMPLOYEE_LEAVE_FAIL,
    GET_DECLINED_EMPLOYEE_LEAVE_START,
    GET_DECLINED_EMPLOYEE_LEAVE_SUCCESS,
    GET_DECLINED_EMPLOYEE_LEAVE_FAIL,
    EDIT_DECLINED_EMPLOYEE_LEAVE
    } from '../types/declinedemployeeleaveTypes';
import { updateObject } from "../utility";

const initialState = {
    declinedemployeeleaves: [],
    declinedemployeeleave: {},
    loading: false,
    error: null,
}

const getDeclinedEmployeeLeaveListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getDeclinedEmployeeLeaveListSuccess = (state, action) => {
  return updateObject(state, {
    declinedemployeeleaves: action.declinedemployeeleaves,
    error: null,
    loading: false
  });
};

const getDeclinedEmployeeLeaveListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createDeclinedEmployeeLeaveStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createDeclinedEmployeeLeaveSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createDeclinedEmployeeLeaveFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getDeclinedEmployeeLeaveDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getDeclinedEmployeeLeaveDetailSuccess = (state, action) => {
  return updateObject(state, {
    declinedemployeeleave: action.declinedemployeeleave,
    error: null,
    loading: false
  });
};

const getDeclinedEmployeeLeaveDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function declinedemployeeleaves(state = initialState, action){
    switch(action.type){
        case GET_DECLINED_EMPLOYEE_LEAVES_START:
            return getDeclinedEmployeeLeaveListStart(state, action);
        case GET_DECLINED_EMPLOYEE_LEAVES_SUCCESS:
            return getDeclinedEmployeeLeaveListSuccess(state, action);
        case GET_DECLINED_EMPLOYEE_LEAVES_FAIL:
            return getDeclinedEmployeeLeaveListFail(state, action);
        case CREATE_DECLINED_EMPLOYEE_LEAVE_START:
            return createDeclinedEmployeeLeaveStart(state, action);
        case CREATE_DECLINED_EMPLOYEE_LEAVE_SUCCESS:
            return createDeclinedEmployeeLeaveSuccess(state, action);
        case CREATE_DECLINED_EMPLOYEE_LEAVE_FAIL:
            return createDeclinedEmployeeLeaveFail(state, action);
        case GET_DECLINED_EMPLOYEE_LEAVE_START:
        return getDeclinedEmployeeLeaveDetailStart(state, action);
        case GET_DECLINED_EMPLOYEE_LEAVE_SUCCESS:
            return getDeclinedEmployeeLeaveDetailSuccess(state, action);
        case GET_DECLINED_EMPLOYEE_LEAVE_FAIL:
            return getDeclinedEmployeeLeaveDetailFail(state, action);
        case EDIT_DECLINED_EMPLOYEE_LEAVE:
            const arrayList = state.declinedemployeeleaves;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                declinedemployeeleaves: arrayList,
            };
        default:
            return state;
    }
}
