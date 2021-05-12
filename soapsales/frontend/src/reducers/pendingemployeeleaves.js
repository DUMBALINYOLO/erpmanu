import {
    GET_PENDING_EMPLOYEE_LEAVES_START,
    GET_PENDING_EMPLOYEE_LEAVES_SUCCESS,
    GET_PENDING_EMPLOYEE_LEAVES_FAIL,
    GET_PENDING_EMPLOYEE_LEAVE_START,
    GET_PENDING_EMPLOYEE_LEAVE_SUCCESS,
    GET_PENDING_EMPLOYEE_LEAVE_FAIL,
    CREATE_PENDING_EMPLOYEE_LEAVE_START,
    CREATE_PENDING_EMPLOYEE_LEAVE_SUCCESS,
    CREATE_PENDING_EMPLOYEE_LEAVE_FAIL,
    EDIT_PENDING_EMPLOYEE_LEAVE
    } from '../types/pendingemployeeleaveTypes';
import { updateObject } from "../utility";

const initialState = {
    pendingemployeeleaves: [],
    pendingemployeeleave: {},
    loading: false,
    error: null,
}

const getPendingEmployeeLeaveListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getPendingEmployeeLeaveListSuccess = (state, action) => {
  return updateObject(state, {
    pendingemployeeleaves: action.pendingemployeeleaves,
    error: null,
    loading: false
  });
};

const getPendingEmployeeLeaveListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createPendingEmployeeLeaveStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createPendingEmployeeLeaveSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createPendingEmployeeLeaveFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getPendingEmployeeLeaveDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getPendingEmployeeLeaveDetailSuccess = (state, action) => {
  return updateObject(state, {
    pendingemployeeleave: action.pendingemployeeleave,
    error: null,
    loading: false
  });
};

const getPendingEmployeeLeaveDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function pendingemployeeleaves(state = initialState, action){
    switch(action.type){
        case GET_PENDING_EMPLOYEE_LEAVES_START:
            return getPendingEmployeeLeaveListStart(state, action);
        case GET_PENDING_EMPLOYEE_LEAVES_SUCCESS:
            return getPendingEmployeeLeaveListSuccess(state, action);
        case GET_PENDING_EMPLOYEE_LEAVES_FAIL:
            return getPendingEmployeeLeaveListFail(state, action);
        case GET_PENDING_EMPLOYEE_LEAVE_START:
            return getPendingEmployeeLeaveDetailStart(state, action);
        case GET_PENDING_EMPLOYEE_LEAVE_SUCCESS:
            return getPendingEmployeeLeaveDetailSuccess(state, action);
        case GET_PENDING_EMPLOYEE_LEAVE_FAIL:
            return getPendingEmployeeLeaveDetailFail(state, action);
        case CREATE_PENDING_EMPLOYEE_LEAVE_START:
            return createPendingEmployeeLeaveStart(state, action);
        case CREATE_PENDING_EMPLOYEE_LEAVE_SUCCESS:
            return createPendingEmployeeLeaveSuccess(state, action);
        case CREATE_PENDING_EMPLOYEE_LEAVE_FAIL:
            return createPendingEmployeeLeaveFail(state, action);
        case EDIT_PENDING_EMPLOYEE_LEAVE:
            const arrayList = state.pendingemployeeleaves;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                pendingemployeeleaves: arrayList,
            };
        default:
            return state;
    }
}
