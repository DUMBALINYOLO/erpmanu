import axios from 'axios';
import { GET_PROCESS_MACHINE_GROUPS, GET_PROCESS_MACHINE_GROUP, DELETE_PROCESS_MACHINE_GROUP, ADD_PROCESS_MACHINE_GROUP } from '../types/processmachinegroupTypes';
import { processmachinegroupsURL } from '../constants';


// Get
export const getProcessMachineGroups = () => dispatch => {
    axios.get(processmachinegroupsURL)
        .then(res => {
            dispatch({
                type: GET_PROCESS_MACHINE_GROUPS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteProcessMachineGroup = (id) => dispatch => {
    axios.delete(processmachinegroupsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_PROCESS_MACHINE_GROUP,
                payload: id
            });
        }).catch(err => console.log(err))
}


// Add
export const addProcessMachineGroup = (processmachinegroup) => dispatch => {
    axios.post(processmachinegroupsURL, processmachinegroup)
        .then(res => {
            dispatch({
                type: ADD_PROCESS_MACHINE_GROUP,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getProcessMachineGroup = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/manufacture/process-machine-group/${id}`)
        .then(res => {
            dispatch({
                type: GET_PROCESS_MACHINE_GROUP,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
