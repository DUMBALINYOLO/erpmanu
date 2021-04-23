import axios from 'axios';
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
import { employeepaycommissionrulesURL } from '../constants';

//employee pay commission rules
const getEmployeePayCommissionRuleListStart = () => {
  return {
    type: GET_EMPLOYEE_PAY_COMMISSION_RULES_START
  };
};

const getEmployeePayCommissionRuleListSuccess = employeepaycommissionrules => {
  return {
    type: GET_EMPLOYEE_PAY_COMMISSION_RULES_SUCCESS,
    employeepaycommissionrules
  };
};

const getEmployeePayCommissionRuleListFail = error => {
  return {
    type: GET_EMPLOYEE_PAY_COMMISSION_RULES_FAIL,
    error: error
  };
};

const createEmployeePayCommissionRuleStart = () => {
  return {
    type: CREATE_EMPLOYEE_PAY_COMMISSION_RULE_START
  };
};

const createEmployeePayCommissionRuleSuccess = employeepaycommissionrule => {
  return {
    type: CREATE_EMPLOYEE_PAY_COMMISSION_RULE_SUCCESS,
    employeepaycommissionrule
  };
};

const createEmployeePayCommissionRuleFail = error => {
  return {
    type: CREATE_EMPLOYEE_PAY_COMMISSION_RULE_FAIL,
    error: error
  };
};

const getEmployeePayCommissionRuleDetailStart = () => {
  return {
    type: GET_EMPLOYEE_PAY_COMMISSION_RULE_START
  };
};

const getEmployeePayCommissionRuleDetailSuccess = employeepaycommissionrule => {
  return {
    type: GET_EMPLOYEE_PAY_COMMISSION_RULE_SUCCESS,
    employeepaycommissionrule
  };
};

const getEmployeePayCommissionRuleDetailFail = error => {
  return {
    type: GET_EMPLOYEE_PAY_COMMISSION_RULE_FAIL,
    error: error
  };
};

export const getEmployeePayCommissionRules = (token) => {
  return dispatch => {
      dispatch(getEmployeePayCommissionRuleListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(employeepaycommissionrulesURL, headers)
        .then(res => {
          const employeepaycommissionrules = res.data;
          dispatch(getEmployeePayCommissionRuleListSuccess(employeepaycommissionrules));
          })
        .catch(err => {
          dispatch(getEmployeePayCommissionRuleListStart(err));
        });
    };
};

export const getEmployeePayCommissionRule = (id, token) => {
  return dispatch => {
      dispatch(getEmployeePayCommissionRuleDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${employeepaycommissionrulesURL}${id}`, headers)
        .then(res => {
          const employeepaycommissionrule = res.data;
          dispatch(getEmployeePayCommissionRuleDetailSuccess(employeepaycommissionrule));
          })
        .catch(err => {
          dispatch(getEmployeePayCommissionRuleDetailFail(err));
        });
    };
};

export const addEmployeePayCommissionRule = (employeepaycommissionrule, token) => {
  return dispatch => {
      dispatch(createEmployeePayCommissionRuleStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(employeepaycommissionrulesURL, employeepaycommissionrule, headers)
        .then(res => {
          dispatch(createEmployeePayCommissionRuleSuccess(employeepaycommissionrule));
        })
        .catch(err => {
          dispatch(createEmployeePayCommissionRuleFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editEmployeePayCommissionRule = (id, employeepaycommissionrule, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${employeepaycommissionrulesURL}${id}/`, employeepaycommissionrule, headers)
    .then(res => {
        dispatch({
            type: EDIT_EMPLOYEE_PAY_COMMISSION_RULE,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
