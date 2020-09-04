import axios from 'axios';
import { GET_EMPLOYEES, ADD_EMPLOYEE } from '../types/employeesTypes';
import { employeesURL } from '../constants';


// Get
export const getEmployees = () => dispatch => {
    axios.get(employeesURL)
        .then(res => {
            dispatch({
                type: GET_EMPLOYEES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

// Add
export const addEmployee = (employee) => dispatch => {
    axios.post(employeesURL, employee)
        .then(res => {
            dispatch({
                type: ADD_EMPLOYEE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
