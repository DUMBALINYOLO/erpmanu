import { 
    GET_EMPLOYEE_PAY_COMMISSION_RULES_START,
    GET_EMPLOYEE_PAY_COMMISSION_RULES_SUCCESS,
    GET_EMPLOYEE_PAY_COMMISSION_RULES_FAIL,
    CREATE_EMPLOYEE_PAY_COMMISSION_RULE_START,
    CREATE_EMPLOYEE_PAY_COMMISSION_RULE_SUCCESS,
    CREATE_EMPLOYEE_PAY_COMMISSION_RULE_FAIL,
    GET_EMPLOYEE_PAY_COMMISSION_RULE_START,
    GET_EMPLOYEE_PAY_COMMISSION_RULE_SUCCESS,
    GET_EMPLOYEE_PAY_COMMISSION_RULE_FAIL,
    EDIT_EMPLOYEE_PAY_COMMISSION_RULE
} from '../types/employeepaycommissionruleTypes';
import { updateObject } from "../utility";

const initialState = {
    employeepaycommissionrules: [],
    employeepaycommissionrule: {},
    loading: false,
    error: null,
}

const getEmployeePayCommissionRuleListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeePayCommissionRuleListSuccess = (state, action) => {
  return updateObject(state, {
    employeepaycommissionrules: action.employeepaycommissionrules,
    error: null,
    loading: false
  });
};

const getEmployeePayCommissionRuleListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createEmployeePayCommissionRuleStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createEmployeePayCommissionRuleSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createEmployeePayCommissionRuleFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getEmployeePayCommissionRuleDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmployeePayCommissionRuleDetailSuccess = (state, action) => {
  return updateObject(state, {
    employeepaycommissionrule: action.employeepaycommissionrule,
    error: null,
    loading: false
  });
};

const getEmployeePayCommissionRuleDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function employeepaycommissionrules(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYEE_PAY_COMMISSION_RULES_START:
            return getEmployeePayCommissionRuleListStart(state, action);
        case GET_EMPLOYEE_PAY_COMMISSION_RULES_SUCCESS:
            return getEmployeePayCommissionRuleListSuccess(state, action);
        case GET_EMPLOYEE_PAY_COMMISSION_RULES_FAIL:
            return getEmployeePayCommissionRuleListFail(state, action);
        case CREATE_EMPLOYEE_PAY_COMMISSION_RULE_START:
            return createEmployeePayCommissionRuleStart(state, action);
        case CREATE_EMPLOYEE_PAY_COMMISSION_RULE_SUCCESS:
            return createEmployeePayCommissionRuleSuccess(state, action);
        case CREATE_EMPLOYEE_PAY_COMMISSION_RULE_FAIL:
            return createEmployeePayCommissionRuleFail(state, action);
        case GET_EMPLOYEE_PAY_COMMISSION_RULE_START:
        return getEmployeePayCommissionRuleDetailStart(state, action);
        case GET_EMPLOYEE_PAY_COMMISSION_RULE_SUCCESS:
            return getEmployeePayCommissionRuleDetailSuccess(state, action);
        case GET_EMPLOYEE_PAY_COMMISSION_RULE_FAIL:
            return getEmployeePayCommissionRuleDetailFail(state, action);
        case EDIT_EMPLOYEE_PAY_COMMISSION_RULE:
            const arrayList = state.employeepaycommissionrules;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                employeepaycommissionrules: arrayList,
            };
        default:
            return state;
    }
}
