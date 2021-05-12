import axios from 'axios';
import {
    GET_INVENTORY_ORDERS_START,
    GET_INVENTORY_ORDERS_SUCCESS,
    GET_INVENTORY_ORDERS_FAIL,
    CREATE_INVENTORY_ORDER_START,
    CREATE_INVENTORY_ORDER_SUCCESS,
    CREATE_INVENTORY_ORDER_FAIL,
    GET_INVENTORY_ORDER_START,
    GET_INVENTORY_ORDER_SUCCESS,
    GET_INVENTORY_ORDER_FAIL,
    EDIT_INVENTORY_ORDER
    } from '../types/inventoryorderTypes';
import { inventoryordersURL } from '../constants';

//inventory orders
const getInventoryOrderListStart = () => {
  return {
    type: GET_INVENTORY_ORDERS_START
  };
};

const getInventoryOrderListSuccess = inventoryorders => {
  return {
    type: GET_INVENTORY_ORDERS_SUCCESS,
    inventoryorders
  };
};

const getInventoryOrderListFail = error => {
  return {
    type: GET_INVENTORY_ORDERS_FAIL,
    error: error
  };
};

const createInventoryOrderStart = () => {
  return {
    type: CREATE_INVENTORY_ORDER_START
  };
};

const createInventoryOrderSuccess = inventoryorder => {
  return {
    type: CREATE_INVENTORY_ORDER_SUCCESS,
    inventoryorder
  };
};

const createInventoryOrderFail = error => {
  return {
    type: CREATE_INVENTORY_ORDER_FAIL,
    error: error
  };
};

const getInventoryOrderDetailStart = () => {
  return {
    type: GET_INVENTORY_ORDER_START
  };
};

const getInventoryOrderDetailSuccess = inventoryorder => {
  return {
    type: GET_INVENTORY_ORDER_SUCCESS,
    inventoryorder
  };
};

const getInventoryOrderDetailFail = error => {
  return {
    type: GET_INVENTORY_ORDER_FAIL,
    error: error
  };
};

export const getInventoryOrders = (token) => {
  return dispatch => {
      dispatch(getInventoryOrderListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(inventoryordersURL, headers)
        .then(res => {
          const inventoryorders = res.data;
          dispatch(getInventoryOrderListSuccess(inventoryorders));
          })
        .catch(err => {
          dispatch(getInventoryOrderListStart(err));
        });
    };
};

export const getInventoryOrder = (id, token) => {
  return dispatch => {
      dispatch(getInventoryOrderDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${inventoryordersURL}${id}`, headers)
        .then(res => {
          const inventoryorder = res.data;
          dispatch(getInventoryOrderDetailSuccess(inventoryorder));
          })
        .catch(err => {
          dispatch(getInventoryOrderDetailFail(err));
        });
    };
};

export const addInventoryOrder = (inventoryorder, token) => {
  return dispatch => {
      dispatch(createInventoryOrderStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(inventoryordersURL, inventoryorder, headers)
        .then(res => {
          dispatch(createInventoryOrderSuccess(inventoryorder));
        })
        .catch(err => {
          dispatch(createInventoryOrderFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editInventoryOrder = (id, inventoryorder, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${inventoryordersURL}${id}/`, inventoryorder, headers)
    .then(res => {
        dispatch({
            type: EDIT_INVENTORY_ORDER,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
