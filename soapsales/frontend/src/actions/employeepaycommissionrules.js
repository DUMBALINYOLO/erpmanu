import axios from 'axios';
import { ADD_EMPLOYEE_PAY_COMMISSION_RULE, GET_EMPLOYEE_PAY_COMMISSION_RULES, GET_EMPLOYEE_PAY_COMMISSION_RULE, DELETE_EMPLOYEE_PAY_COMMISSION_RULE } from '../types/employeepaycommissionruleTypes';
import { employeepaycommissionrulesURL } from '../constants';

// Get
export const getEmployeePayCommissionRules=  () => dispatch => {
    axios.get(employeepaycommissionrulesURL)
        .then(res => {
            dispatch({
                type:  GET_EMPLOYEE_PAY_COMMISSION_RULES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteEmployeePayCommissionRule = (id) => dispatch => {
    axios.delete(employeepaycommissionrulesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_EMPLOYEE_PAY_COMMISSION_RULE,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addEmployeePayCommissionRule = employeepaycommissionrule => dispatch => {
    axios.post(employeepaycommissionrulesURL, employeepaycommissionrule)
        .then(res => {
            dispatch({
                type: ADD_EMPLOYEE_PAY_COMMISSION_RULE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeePayCommissionRule = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/employee-pay-commission-rules/${id}`)
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_PAY_COMMISSION_RULE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
