import axios from 'axios';
import {
    GET_INVENTORY_STOCK_ITEMS_START,
    GET_INVENTORY_STOCK_ITEMS_SUCCESS,
    GET_INVENTORY_STOCK_ITEMS_FAIL,
    CREATE_INVENTORY_STOCK_ITEM_START,
    CREATE_INVENTORY_STOCK_ITEM_SUCCESS,
    CREATE_INVENTORY_STOCK_ITEM_FAIL,
    GET_INVENTORY_STOCK_ITEM_START,
    GET_INVENTORY_STOCK_ITEM_SUCCESS,
    GET_INVENTORY_STOCK_ITEM_FAIL,
    EDIT_INVENTORY_STOCK_ITEM
    } from '../types/inventorystockitemTypes';
import { inventorystockitemsURL } from '../constants';

//inventory stock items
const getInventoryStockItemListStart = () => {
  return {
    type: GET_INVENTORY_STOCK_ITEMS_START
  };
};

const getInventoryStockItemListSuccess = inventorystockitems => {
  return {
    type: GET_INVENTORY_STOCK_ITEMS_SUCCESS,
    inventorystockitems
  };
};

const getInventoryStockItemListFail = error => {
  return {
    type: GET_INVENTORY_STOCK_ITEMS_FAIL,
    error: error
  };
};

const createInventoryStockItemStart = () => {
  return {
    type: CREATE_INVENTORY_STOCK_ITEM_START
  };
};

const createInventoryStockItemSuccess = inventorystockitem => {
  return {
    type: CREATE_INVENTORY_STOCK_ITEM_SUCCESS,
    inventorystockitem
  };
};

const createInventoryStockItemFail = error => {
  return {
    type: CREATE_INVENTORY_STOCK_ITEM_FAIL,
    error: error
  };
};

const getInventoryStockItemDetailStart = () => {
  return {
    type: GET_INVENTORY_STOCK_ITEM_START
  };
};

const getInventoryStockItemDetailSuccess = inventorystockitem => {
  return {
    type: GET_INVENTORY_STOCK_ITEM_SUCCESS,
    inventorystockitem
  };
};

const getInventoryStockItemDetailFail = error => {
  return {
    type: GET_INVENTORY_STOCK_ITEM_FAIL,
    error: error
  };
};

export const getInventoryStockItems = (token) => {
  return dispatch => {
      dispatch(getInventoryStockItemListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(inventorystockitemsURL, headers)
        .then(res => {
          const inventorystockitems = res.data;
          dispatch(getInventoryStockItemListSuccess(inventorystockitems));
          })
        .catch(err => {
          dispatch(getInventoryStockItemListStart(err));
        });
    };
};

export const getInventoryStockItem = (id, token) => {
  return dispatch => {
      dispatch(getInventoryStockItemDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${inventorystockitemsURL}${id}`, headers)
        .then(res => {
          const inventorystockitem = res.data;
          dispatch(getInventoryStockItemDetailSuccess(inventorystockitem));
          })
        .catch(err => {
          dispatch(getInventoryStockItemDetailFail(err));
        });
    };
};

export const addInventoryStockItem = (inventorystockitem, token) => {
  return dispatch => {
      dispatch(createInventoryStockItemStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(inventorystockitemsURL, inventorystockitem, headers)
        .then(res => {
          dispatch(createInventoryStockItemSuccess(inventorystockitem));
        })
        .catch(err => {
          dispatch(createInventoryStockItemFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editInventoryStockItem = (id, inventorystockitem, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${inventorystockitemsURL}${id}/`, inventorystockitem, headers)
    .then(res => {
        dispatch({
            type: EDIT_INVENTORY_STOCK_ITEM,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
