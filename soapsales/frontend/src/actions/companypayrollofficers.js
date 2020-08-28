import axios from 'axios';
import {
        ADD_COMPANY_PAYROLL_OFFICER,
        GET_COMPANY_PAYROLL_OFFICERS,
        GET_COMPANY_PAYROLL_OFFICER,
        DELETE_COMPANY_PAYROLL_OFFICER
    } from '../types/companypayrollofficerTypes';
import { companypayrollofficersURL } from '../constants';

// Get
export const getCompanyPayrollOfficers =  () => dispatch => {
    axios.get(companypayrollofficersURL)
        .then(res => {
            dispatch({
                type:  GET_COMPANY_PAYROLL_OFFICERS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteCompanyPayrollOfficer = (id) => dispatch => {
    axios.delete(companypayrollofficersURL, id)
        .then(res => {
            dispatch({
                type: DELETE_COMPANY_PAYROLL_OFFICER,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addCompanyPayrollOfficer = companypayrollofficer => dispatch => {
    axios.post(companypayrollofficersURL, companypayrollofficer)
        .then(res => {
            dispatch({
                type: ADD_COMPANY_PAYROLL_OFFICER,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getCompanyPayrollOfficer = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/company-payroll-officers/${id}`)
        .then(res => {
            dispatch({
                type: GET_COMPANY_PAYROLL_OFFICER,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
