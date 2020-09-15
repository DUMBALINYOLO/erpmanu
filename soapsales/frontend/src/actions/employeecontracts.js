import axios from 'axios';
import { ADD_EMPLOYEE_CONTRACT, EDIT_EMPLOYEE_CONTRACT, GET_EMPLOYEE_CONTRACTS, GET_EMPLOYEE_CONTRACT, DELETE_EMPLOYEE_CONTRACT } from '../types/employeecontractTypes';
import { employeecontractsURL } from '../constants';

// Get
export const getEmployeeContracts=  () => dispatch => {
    axios.get(employeecontractsURL)
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_CONTRACTS ,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteEmployeeContract = (id) => dispatch => {
    axios.delete(employeecontractsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_EMPLOYEE_CONTRACT,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addEmployeeContract = employeecontract => dispatch => {
    axios.post(employeecontractsURL, employeecontract)
        .then(res => {
            dispatch({
                type: ADD_EMPLOYEE_CONTRACT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeeContract = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/employees/employee-contracts/${id}`)
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_CONTRACT,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

//Edit
export const editEmployeeContract = (id, employeecontract) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/employees/employee-contracts/${id}/`, employeecontract)
        .then(res => {
            dispatch({
                type: EDIT_EMPLOYEE_CONTRACT,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
