import axios from 'axios';
import { GET_EMPLOYEES } from '../types/employeesTypes';
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


