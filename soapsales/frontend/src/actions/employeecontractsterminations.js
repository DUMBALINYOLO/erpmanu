import axios from 'axios';
import { ADD_EMPLOYEE_CONTRACTS_TERMINATION, GET_EMPLOYEE_CONTRACTS_TERMINATIONS, GET_EMPLOYEE_CONTRACTS_TERMINATION, DELETE_EMPLOYEE_CONTRACTS_TERMINATION } from '../types/employeecontractsterminationTypes';
import { employeecontractsterminationsURL } from '../constants';

// Get
export const getEmployeeContractsTerminations=  () => dispatch => {
    axios.get(employeecontractsterminationsURL)
        .then(res => {
            dispatch({
                type:  GET_EMPLOYEE_CONTRACTS_TERMINATIONS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteEmployeeContractsTermination = (id) => dispatch => {
    axios.delete(employeecontractsterminationsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_EMPLOYEE_CONTRACTS_TERMINATION,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addEmployeeContractsTermination = employeecontractstermination => dispatch => {
    axios.post(employeecontractsterminationsURL, employeecontractstermination)
        .then(res => {
            dispatch({
                type: ADD_EMPLOYEE_CONTRACTS_TERMINATION,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeeContractsTermination = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/employee-contracts-terminations/${id}`)
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_CONTRACTS_TERMINATION,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
