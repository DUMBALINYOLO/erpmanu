import axios from 'axios';
import {
    GET_INVENTORY_STOCK_TAKES_START,
    GET_INVENTORY_STOCK_TAKES_SUCCESS,
    GET_INVENTORY_STOCK_TAKES_FAIL,
    CREATE_INVENTORY_STOCK_TAKE_START,
    CREATE_INVENTORY_STOCK_TAKE_SUCCESS,
    CREATE_INVENTORY_STOCK_TAKE_FAIL,
    GET_INVENTORY_STOCK_TAKE_START,
    GET_INVENTORY_STOCK_TAKE_SUCCESS,
    GET_INVENTORY_STOCK_TAKE_FAIL,
    EDIT_INVENTORY_STOCK_TAKE
    } from '../types/inventorystocktakeTypes';
import { inventorystocktakesURL } from '../constants';

//inventory stock takes
const getInventoryStockTakeListStart = () => {
  return {
    type: GET_INVENTORY_STOCK_TAKES_START
  };
};

const getInventoryStockTakeListSuccess = inventorystocktakes => {
  return {
    type: GET_INVENTORY_STOCK_TAKES_SUCCESS,
    inventorystocktakes
  };
};

const getInventoryStockTakeListFail = error => {
  return {
    type: GET_INVENTORY_STOCK_TAKES_FAIL,
    error: error
  };
};

const createInventoryStockTakeStart = () => {
  return {
    type: CREATE_INVENTORY_STOCK_TAKE_START
  };
};

const createInventoryStockTakeSuccess = inventorystocktake => {
  return {
    type: CREATE_INVENTORY_STOCK_TAKE_SUCCESS,
    inventorystocktake
  };
};

const createInventoryStockTakeFail = error => {
  return {
    type: CREATE_INVENTORY_STOCK_TAKE_FAIL,
    error: error
  };
};

const getInventoryStockTakeDetailStart = () => {
  return {
    type: GET_INVENTORY_STOCK_TAKE_START
  };
};

const getInventoryStockTakeDetailSuccess = inventorystocktake => {
  return {
    type: GET_INVENTORY_STOCK_TAKE_SUCCESS,
    inventorystocktake
  };
};

const getInventoryStockTakeDetailFail = error => {
  return {
    type: GET_INVENTORY_STOCK_TAKE_FAIL,
    error: error
  };
};

export const getInventoryStockTakes = (token) => {
  return dispatch => {
      dispatch(getInventoryStockTakeListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(inventorystocktakesURL, headers)
        .then(res => {
          const inventorystocktakes = res.data;
          dispatch(getInventoryStockTakeListSuccess(inventorystocktakes));
          })
        .catch(err => {
          dispatch(getInventoryStockTakeListStart(err));
        });
    };
};

export const getInventoryStockTake = (id, token) => {
  return dispatch => {
      dispatch(getInventoryStockTakeDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${inventorystocktakesURL}${id}`, headers)
        .then(res => {
          const inventorystocktake = res.data;
          dispatch(getInventoryStockTakeDetailSuccess(inventorystocktake));
          })
        .catch(err => {
          dispatch(getInventoryStockTakeDetailFail(err));
        });
    };
};

export const addInventoryStockTake = (inventorystocktake, token) => {
  return dispatch => {
      dispatch(createInventoryStockTakeStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(inventorystocktakesURL, inventorystocktake, headers)
        .then(res => {
          dispatch(createInventoryStockTakeSuccess(inventorystocktake));
        })
        .catch(err => {
          dispatch(createInventoryStockTakeFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editInventoryStockTake = (id, inventorystocktake, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${inventorystocktakesURL}${id}/`, inventorystocktake, headers)
    .then(res => {
        dispatch({
            type: EDIT_INVENTORY_STOCK_TAKE,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
