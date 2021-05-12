import { 
    GET_EMPLOYEE_LEAVES_START,
    GET_EMPLOYEE_LEAVES_SUCCESS,
    GET_EMPLOYEE_LEAVES_FAIL,
    CREATE_EMPLOYEE_LEAVE_START,
    CREATE_EMPLOYEE_LEAVE_SUCCESS,
    CREATE_EMPLOYEE_LEAVE_FAIL,
    GET_EMPLOYEE_LEAVE_START,
    GET_EMPLOYEE_LEAVE_SUCCESS,
    GET_EMPLOYEE_LEAVE_FAIL,
    EDIT_EMPLOYEE_LEAVE 
} from '../types/employeeleaveTypes';
import { updateObject } from "../utility";

const initialState = {
    employeeleaves: [],
    employeeleave: {},
    loading: false,
    error: null,
}

const getEmployeeLeaveListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeeLeaveListSuccess = (state, action) => {
  return updateObject(state, {
    employeeleaves: action.employeeleaves,
    error: null,
    loading: false
  });
};

const getEmployeeLeaveListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createEmployeeLeaveStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createEmployeeLeaveSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createEmployeeLeaveFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getEmployeeLeaveDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeeLeaveDetailSuccess = (state, action) => {
  return updateObject(state, {
    employeeleave: action.employeeleave,
    error: null,
    loading: false
  });
};

const getEmployeeLeaveDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function employeeleaves(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_LEAVES_START:
            return getEmployeeLeaveListStart(state, action);
        case GET_EMPLOYEE_LEAVES_SUCCESS:
            return getEmployeeLeaveListSuccess(state, action);
        case GET_EMPLOYEE_LEAVES_FAIL:
            return getEmployeeLeaveListFail(state, action);
        case CREATE_EMPLOYEE_LEAVE_START:
            return createEmployeeLeaveStart(state, action);
        case CREATE_EMPLOYEE_LEAVE_SUCCESS:
            return createEmployeeLeaveSuccess(state, action);
        case CREATE_EMPLOYEE_LEAVE_FAIL:
            return createEmployeeLeaveFail(state, action);
        case GET_EMPLOYEE_LEAVE_START:
        return getEmployeeLeaveDetailStart(state, action);
        case GET_EMPLOYEE_LEAVE_SUCCESS:
            return getEmployeeLeaveDetailSuccess(state, action);
        case GET_EMPLOYEE_LEAVE_FAIL:
            return getEmployeeLeaveDetailFail(state, action);
        case EDIT_EMPLOYEE_LEAVE:
            const arrayList = state.employeeleaves;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeeleaves: arrayList,
            };
        default:
            return state;
    }
}
