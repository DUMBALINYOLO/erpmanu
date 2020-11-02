import axios from 'axios';
import { GET_PROCESS_RATES, GET_PROCESS_RATE, EDIT_PROCESS_RATE, DELETE_PROCESS_RATE, ADD_PROCESS_RATE } from '../types/processrateTypes';
import { processratesURL } from '../constants';


// Get
export const getProcessRates = () => dispatch => {
    axios.get(processratesURL)
        .then(res => {
            dispatch({
                type: GET_PROCESS_RATES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteProcessRate = (id) => dispatch => {
    axios.delete(processratesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_PROCESS_RATE,
                payload: id
            });
        }).catch(err => console.log(err))
}


// Add
export const addProcessRate = (processrate) => dispatch => {
    axios.post(processratesURL, processrate)
        .then(res => {
            dispatch({
                type: ADD_PROCESS_RATE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getProcessRate = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/manufacture/process-rates/${id}`)
        .then(res => {
            dispatch({
                type: GET_PROCESS_RATE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}

//Edit
export const editProcessRate = (id, processrate) => dispatch => {
    axios.put(`http://127.0.0.1:8000/api/manufacture/process-rates/${id}/`, processrate)
        .then(res => {
            dispatch({
                type: EDIT_PROCESS_RATE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
