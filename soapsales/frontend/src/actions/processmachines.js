import axios from 'axios';
import { GET_PROCESS_MACHINES, GET_PROCESS_MACHINE, DELETE_PROCESS_MACHINE, ADD_PROCESS_MACHINE } from '../types/processmachineTypes';
import { processmachinesURL } from '../constants';


// Get
export const getProcessMachines = () => dispatch => {
    axios.get(processmachinesURL)
        .then(res => {
            dispatch({
                type: GET_PROCESS_MACHINES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteProcessMachine = (id) => dispatch => {
    axios.delete(processmachinesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_PROCESS_MACHINE,
                payload: id
            });
        }).catch(err => console.log(err))
}


// Add
export const addProcessMachine = (processmachine) => dispatch => {
    axios.post(processmachinesURL, processmachine)
        .then(res => {
            dispatch({
                type: ADD_PROCESS_MACHINE,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getProcessMachine = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/manufacture/process-machines/${id}`)
        .then(res => {
            dispatch({
                type: GET_PROCESS_MACHINE,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
