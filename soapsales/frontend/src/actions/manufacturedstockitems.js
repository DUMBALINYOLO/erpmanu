import axios from 'axios';
import {
    GET_MANUFACTURED_STOCK_ITEMS_START,
    GET_MANUFACTURED_STOCK_ITEMS_SUCCESS,
    GET_MANUFACTURED_STOCK_ITEMS_FAIL,
    CREATE_MANUFACTURED_STOCK_ITEM_START,
    CREATE_MANUFACTURED_STOCK_ITEM_SUCCESS,
    CREATE_MANUFACTURED_STOCK_ITEM_FAIL,
    GET_MANUFACTURED_STOCK_ITEM_START,
    GET_MANUFACTURED_STOCK_ITEM_SUCCESS,
    GET_MANUFACTURED_STOCK_ITEM_FAIL,
    EDIT_MANUFACTURED_STOCK_ITEM
    } from '../types/manufacturedstockitemTypes';
import { manufacturedstockitemsURL } from '../constants';

//manufactured stock items
const getManufacturedStockItemListStart = () => {
  return {
    type: GET_MANUFACTURED_STOCK_ITEMS_START
  };
};

const getManufacturedStockItemListSuccess = manufacturedstockitems => {
  return {
    type: GET_MANUFACTURED_STOCK_ITEMS_SUCCESS,
    manufacturedstockitems
  };
};

const getManufacturedStockItemListFail = error => {
  return {
    type: GET_MANUFACTURED_STOCK_ITEMS_FAIL,
    error: error
  };
};

const createManufacturedStockItemStart = () => {
  return {
    type: CREATE_MANUFACTURED_STOCK_ITEM_START
  };
};

const createManufacturedStockItemSuccess = manufacturedstockitem => {
  return {
    type: CREATE_MANUFACTURED_STOCK_ITEM_SUCCESS,
    manufacturedstockitem
  };
};

const createManufacturedStockItemFail = error => {
  return {
    type: CREATE_MANUFACTURED_STOCK_ITEM_FAIL,
    error: error
  };
};

const getManufacturedStockItemDetailStart = () => {
  return {
    type: GET_MANUFACTURED_STOCK_ITEM_START
  };
};

const getManufacturedStockItemDetailSuccess = manufacturedstockitem => {
  return {
    type: GET_MANUFACTURED_STOCK_ITEM_SUCCESS,
    manufacturedstockitem
  };
};

const getManufacturedStockItemDetailFail = error => {
  return {
    type: GET_MANUFACTURED_STOCK_ITEM_FAIL,
    error: error
  };
};

export const getManufacturedStockItems = (token) => {
  return dispatch => {
      dispatch(getManufacturedStockItemListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(manufacturedstockitemsURL, headers)
        .then(res => {
          const manufacturedstockitems = res.data;
          dispatch(getManufacturedStockItemListSuccess(manufacturedstockitems));
          })
        .catch(err => {
          dispatch(getManufacturedStockItemListStart(err));
        });
    };
};

export const getManufacturedStockItem = (id, token) => {
  return dispatch => {
      dispatch(getManufacturedStockItemDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${manufacturedstockitemsURL}${id}`, headers)
        .then(res => {
          const manufacturedstockitem = res.data;
          dispatch(getManufacturedStockItemDetailSuccess(manufacturedstockitem));
          })
        .catch(err => {
          dispatch(getManufacturedStockItemDetailFail(err));
        });
    };
};

export const addManufacturedStockItem = (manufacturedstockitem, token) => {
  return dispatch => {
      dispatch(createManufacturedStockItemStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(manufacturedstockitemsURL, manufacturedstockitem, headers)
        .then(res => {
          dispatch(createManufacturedStockItemSuccess(manufacturedstockitem));
        })
        .catch(err => {
          dispatch(createManufacturedStockItemFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editManufacturedStockItem = (id, manufacturedstockitem, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${manufacturedstockitemsURL}${id}/`, manufacturedstockitem, headers)
    .then(res => {
        dispatch({
            type: EDIT_MANUFACTURED_STOCK_ITEM,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
