import {
    GET_AUTHORISED_EMPLOYEE_LEAVES_START,
    GET_AUTHORISED_EMPLOYEE_LEAVES_SUCCESS,
    GET_AUTHORISED_EMPLOYEE_LEAVES_FAIL,
    CREATE_AUTHORISED_EMPLOYEE_LEAVE_START,
    CREATE_AUTHORISED_EMPLOYEE_LEAVE_SUCCESS,
    CREATE_AUTHORISED_EMPLOYEE_LEAVE_FAIL,
    GET_AUTHORISED_EMPLOYEE_LEAVE_START,
    GET_AUTHORISED_EMPLOYEE_LEAVE_SUCCESS,
    GET_AUTHORISED_EMPLOYEE_LEAVE_FAIL,
    EDIT_AUTHORISED_EMPLOYEE_LEAVE
    } from '../types/authorisedemployeeleaveTypes';
import { updateObject } from "../utility";

const initialState = {
    authorisedemployeeleaves: [],
    authorisedemployeeleave: {},
    loading: false,
    error: null,
}

const getAuthorisedEmployeeLeaveListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getAuthorisedEmployeeLeaveListSuccess = (state, action) => {
  return updateObject(state, {
    authorisedemployeeleaves: action.authorisedemployeeleaves,
    error: null,
    loading: false
  });
};

const getAuthorisedEmployeeLeaveListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createAuthorisedEmployeeLeaveStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createAuthorisedEmployeeLeaveSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createAuthorisedEmployeeLeaveFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getAuthorisedEmployeeLeaveDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getAuthorisedEmployeeLeaveDetailSuccess = (state, action) => {
  return updateObject(state, {
    authorisedemployeeleave: action.authorisedemployeeleave,
    error: null,
    loading: false
  });
};

const getAuthorisedEmployeeLeaveDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function authorisedemployeeleaves(state = initialState, action){
    switch(action.type){
        case GET_AUTHORISED_EMPLOYEE_LEAVES_START:
            return getAuthorisedEmployeeLeaveListStart(state, action);
        case GET_AUTHORISED_EMPLOYEE_LEAVES_SUCCESS:
            return getAuthorisedEmployeeLeaveListSuccess(state, action);
        case GET_AUTHORISED_EMPLOYEE_LEAVES_FAIL:
            return getAuthorisedEmployeeLeaveListFail(state, action);
        case CREATE_AUTHORISED_EMPLOYEE_LEAVE_START:
            return createAuthorisedEmployeeLeaveStart(state, action);
        case CREATE_AUTHORISED_EMPLOYEE_LEAVE_SUCCESS:
            return createAuthorisedEmployeeLeaveSuccess(state, action);
        case CREATE_AUTHORISED_EMPLOYEE_LEAVE_FAIL:
            return createAuthorisedEmployeeLeaveFail(state, action);
        case GET_AUTHORISED_EMPLOYEE_LEAVE_START:
        return getAuthorisedEmployeeLeaveDetailStart(state, action);
        case GET_AUTHORISED_EMPLOYEE_LEAVE_SUCCESS:
            return getAuthorisedEmployeeLeaveDetailSuccess(state, action);
        case GET_AUTHORISED_EMPLOYEE_LEAVE_FAIL:
            return getAuthorisedEmployeeLeaveDetailFail(state, action);
        case EDIT_AUTHORISED_EMPLOYEE_LEAVE:
            const arrayList = state.authorisedemployeeleaves;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                authorisedemployeeleaves: arrayList,
            };
        default:
            return state;
    }
}
