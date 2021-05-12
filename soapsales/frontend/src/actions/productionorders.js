import axios from 'axios';
import { 
    GET_PRODUCTION_ORDERS_START,
    GET_PRODUCTION_ORDERS_SUCCESS,
    GET_PRODUCTION_ORDERS_FAIL,
    CREATE_PRODUCTION_ORDER_START,
    CREATE_PRODUCTION_ORDER_SUCCESS,
    CREATE_PRODUCTION_ORDER_FAIL,
    GET_PRODUCTION_ORDER_START,
    GET_PRODUCTION_ORDER_SUCCESS,
    GET_PRODUCTION_ORDER_FAIL,
    EDIT_PRODUCTION_ORDER 
} from '../types/productionorderTypes';
import { productionordersURL } from '../constants';

//production orders
const getProductionOrderListStart = () => {
  return {
    type: GET_PRODUCTION_ORDERS_START
  };
};

const getProductionOrderListSuccess = productionorders => {
  return {
    type: GET_PRODUCTION_ORDERS_SUCCESS,
    productionorders
  };
};

const getProductionOrderListFail = error => {
  return {
    type: GET_PRODUCTION_ORDERS_FAIL,
    error: error
  };
};

const createProductionOrderStart = () => {
  return {
    type: CREATE_PRODUCTION_ORDER_START
  };
};


const createProductionOrderSuccess = productionorder => {
  return {
    type: CREATE_PRODUCTION_ORDER_SUCCESS,
    productionorder
  };
};

const createProductionOrderFail = error => {
  return {
    type: CREATE_PRODUCTION_ORDER_FAIL,
    error: error
  };
};

const getProductionOrderDetailStart = () => {
  return {
    type: GET_PRODUCTION_ORDER_START
  };
};

const getProductionOrderDetailSuccess = productionorder => {
  return {
    type: GET_PRODUCTION_ORDER_SUCCESS,
    productionorder
  };
};

const getProductionOrderDetailFail = error => {
  return {
    type: GET_PRODUCTION_ORDER_FAIL,
    error: error
  };
};

export const getProductionOrders = (token) => {
  return dispatch => {
      dispatch(getProductionOrderListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(productionordersURL, headers)
        .then(res => {
          const productionorders = res.data;
          dispatch(getProductionOrderListSuccess(productionorders));
          })
        .catch(err => {
          dispatch(getProductionOrderListStart(err));
        });
    };
};

export const getProductionOrder = (id, token) => {
  return dispatch => {
      dispatch(getProductionOrderDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${productionordersURL}${id}`, headers)
        .then(res => {
          const productionorder = res.data;
          dispatch(getProductionOrderDetailSuccess(productionorder));
          })
        .catch(err => {
          dispatch(getProductionOrderDetailFail(err));
        });
    };
};

export const addProductionOrder = (productionorder, token) => {
  return dispatch => {
      dispatch(createProductionOrderStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(productionordersURL, productionorder, headers)
        .then(res => {
          dispatch(createProductionOrderSuccess(productionorder));
        })
        .catch(err => {
          dispatch(createProductionOrderFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editProductionOrder = (id, productionorder, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${productionordersURL}${id}/`, productionorder, headers)
    .then(res => {
        dispatch({
            type: EDIT_PRODUCTION_ORDER,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
