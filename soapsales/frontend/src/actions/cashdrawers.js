import axios from 'axios';
import { GET_CASH_DRAWERS} from './types';
import { cashdrawersURL } from '../constants';


// Get
export const getCashDrawers = () => dispatch => {
    axios.get(cashdrawersURL)
        .then(res => {
            dispatch({
                type: GET_CASH_DRAWERS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}