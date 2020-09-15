import axios from 'axios';
import { GET_PROCESSES } from './types';
import { productionprocessesURL } from '../constants';


// Get
export const getProductionProcesses = () => dispatch => {
    axios.get(productionprocessesURL)
        .then(res => {
            dispatch({
                type: GET_PROCESSES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}