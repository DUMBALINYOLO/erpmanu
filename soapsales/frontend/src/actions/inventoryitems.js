import axios from 'axios';
import { 
  GET_INVENTORY_ITEMS_START,
  GET_INVENTORY_ITEMS_SUCCESS,
  GET_INVENTORY_ITEMS_FAIL 
} from './types';
import { inventoryitemsURL } from '../constants';

//inventory items
const getInventoryItemListStart = () => {
  return {
    type: GET_INVENTORY_ITEMS_START
  };
};

const getInventoryItemListSuccess = inventoryitems => {
  return {
    type: GET_INVENTORY_ITEMS_SUCCESS,
    inventoryitems
  };
};

const getInventoryItemListFail = error => {
  return {
    type: GET_INVENTORY_ITEMS_FAIL,
    error: error
  };
};

export const getInventoryItems = (token) => {
  return dispatch => {
      dispatch(getInventoryItemListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(inventoryitemsURL, headers)
        .then(res => {
          const inventoryitems = res.data;
          dispatch(getInventoryItemListSuccess(inventoryitems));
          })
        .catch(err => {
          dispatch(getInventoryItemListStart(err));
        });
    };
};

