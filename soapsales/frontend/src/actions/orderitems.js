import axios from 'axios';
import {
    GET_ORDER_ITEMS_START,
    GET_ORDER_ITEMS_SUCCESS,
    GET_ORDER_ITEMS_FAIL,
    CREATE_ORDER_ITEM_START,
    CREATE_ORDER_ITEM_SUCCESS,
    CREATE_ORDER_ITEM_FAIL,
    GET_ORDER_ITEM_START,
    GET_ORDER_ITEM_SUCCESS,
    GET_ORDER_ITEM_FAIL,
    EDIT_ORDER_ITEM
    } from '../types/orderitemTypes';
import { orderitemsURL } from '../constants';

//order items
const getOrderItemListStart = () => {
  return {
    type: GET_ORDER_ITEMS_START
  };
};

const getOrderItemListSuccess = orderitems => {
  return {
    type: GET_ORDER_ITEMS_SUCCESS,
    orderitems
  };
};

const getOrderItemListFail = error => {
  return {
    type: GET_ORDER_ITEMS_FAIL,
    error: error
  };
};

const createOrderItemStart = () => {
  return {
    type: CREATE_ORDER_ITEM_START
  };
};

const createOrderItemSuccess = orderitem => {
  return {
    type: CREATE_ORDER_ITEM_SUCCESS,
    orderitem
  };
};

const createOrderItemFail = error => {
  return {
    type: CREATE_ORDER_ITEM_FAIL,
    error: error
  };
};

const getOrderItemDetailStart = () => {
  return {
    type: GET_ORDER_ITEM_START
  };
};

const getOrderItemDetailSuccess = orderitem => {
  return {
    type: GET_ORDER_ITEM_SUCCESS,
    orderitem
  };
};

const getOrderItemDetailFail = error => {
  return {
    type: GET_ORDER_ITEM_FAIL,
    error: error
  };
};

export const getOrderItems = (token) => {
  return dispatch => {
      dispatch(getOrderItemListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(orderitemsURL, headers)
        .then(res => {
          const orderitems = res.data;
          dispatch(getOrderItemListSuccess(orderitems));
          })
        .catch(err => {
          dispatch(getOrderItemListStart(err));
        });
    };
};

export const getOrderItem = (id, token) => {
  return dispatch => {
      dispatch(getOrderItemDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${orderitemsURL}${id}`, headers)
        .then(res => {
          const orderitem = res.data;
          dispatch(getOrderItemDetailSuccess(orderitem));
          })
        .catch(err => {
          dispatch(getOrderItemDetailFail(err));
        });
    };
};

export const addOrderItem = (orderitem, token) => {
  return dispatch => {
      dispatch(createOrderItemStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(orderitemsURL, orderitem, headers)
        .then(res => {
          dispatch(createOrderItemSuccess(orderitem));
        })
        .catch(err => {
          dispatch(createOrderItemFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editOrderItem = (id, orderitem, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${orderitemsURL}${id}/`, orderitem, headers)
    .then(res => {
        dispatch({
            type: EDIT_ORDER_ITEM,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
