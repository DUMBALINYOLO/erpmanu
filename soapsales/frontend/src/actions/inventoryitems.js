import axios from 'axios';
import { GET_INVENTORY_ITEMS } from './types';
import { inventoryitemsURL } from '../constants';


// Get
export const getInventoryItems = () => dispatch => {
    axios.get(inventoryitemsURL)
        .then(res => {
            dispatch({
                type: GET_INVENTORY_ITEMS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}