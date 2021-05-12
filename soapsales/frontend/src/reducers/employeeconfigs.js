import { 
    CREATE_EMPLOYEE_CONFIG_START,
    CREATE_EMPLOYEE_CONFIG_SUCCESS,
    CREATE_EMPLOYEE_CONFIG_FAIL,
    EDIT_EMPLOYEE_CONFIG 
} from '../types/employeeconfigTypes';
import { updateObject } from "../utility";

const initialState = {
    employeeconfigs: [],
    employeeconfig: {},
    loading: false,
    error: null,
}
const createEmployeeConfigStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createEmployeeConfigSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createEmployeeConfigFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function employeeconfigs(state = initialState, action){
    switch(action.type){
        case CREATE_EMPLOYEE_CONFIG_START:
            return createEmployeeConfigStart(state, action);
        case CREATE_EMPLOYEE_CONFIG_SUCCESS:
            return createEmployeeConfigSuccess(state, action);
        case CREATE_EMPLOYEE_CONFIG_FAIL:
            return createEmployeeConfigFail(state, action);
        case EDIT_EMPLOYEE_CONFIG:
            const arrayList = state.accountingadjustments;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                accountingadjustments: arrayList,
            };
        default:
            return state;
    }
}
