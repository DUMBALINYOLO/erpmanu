import axios from 'axios';
import { ADD_EMPLOYEE_CONFIG } from '../types/employeeconfigTypes';
import { employeeconfigURL } from '../constants';

// Add
export const addEmployeeConfig = employeeconfig => dispatch => {
    axios.post(employeeconfigURL, employeeconfig)
        .then(res => {
            dispatch({
                type: ADD_EMPLOYEE_CONFIG,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
