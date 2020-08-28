import axios from 'axios';
import {
        GET_VERIFIED_PRODUCTION_PROCESSES,
        DELETE_VERIFIED_PRODUCTION_PROCESS,
        GET_VERIFIED_PRODUCTION_PROCESS
    } from '../types/verifiedproductionprocessTypes';
import { verifiedproductionprocessesURL } from '../constants';

// Get
export const getVerifiedProductionProcesses = () => dispatch => {
    axios.get(verifiedproductionprocessesURL)
        .then(res => {
            dispatch({
                type: GET_VERIFIED_PRODUCTION_PROCESSES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete
export const deleteVerifiedProductionProcess = (id) => dispatch => {
    axios.delete(verifiedproductionprocessesURL, id)
        .then(res => {
            dispatch({
                type: DELETE_VERIFIED_PRODUCTION_PROCESS,
                payload: id
            });
        }).catch(err => console.log(err))
}

//get
export const getVerifiedProductionProcess = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/manufacture/verified-production-processes/${id}`)
        .then(res => {
            dispatch({
                type: GET_VERIFIED_PRODUCTION_PROCESS,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
