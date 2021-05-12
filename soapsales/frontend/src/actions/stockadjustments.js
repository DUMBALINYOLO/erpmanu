import axios from 'axios';
import {
    GET_STOCK_ADJUSTMENTS_START,
    GET_STOCK_ADJUSTMENTS_SUCCESS,
    GET_STOCK_ADJUSTMENTS_FAIL,
    CREATE_STOCK_ADJUSTMENT_START,
    CREATE_STOCK_ADJUSTMENT_SUCCESS,
    CREATE_STOCK_ADJUSTMENT_FAIL,
    GET_STOCK_ADJUSTMENT_START,
    GET_STOCK_ADJUSTMENT_SUCCESS,
    GET_STOCK_ADJUSTMENT_FAIL,
    EDIT_STOCK_ADJUSTMENT
    } from '../types/stockadjustmentTypes';
import { stockadjustmentsURL } from '../constants';

//stock adjustments
const getStockAdjustmentListStart = () => {
  return {
    type: GET_STOCK_ADJUSTMENTS_START
  };
};

const getStockAdjustmentListSuccess = stockadjustments => {
  return {
    type: GET_STOCK_ADJUSTMENTS_SUCCESS,
    stockadjustments
  };
};

const getStockAdjustmentListFail = error => {
  return {
    type: GET_STOCK_ADJUSTMENTS_FAIL,
    error: error
  };
};

const createStockAdjustmentStart = () => {
  return {
    type: CREATE_STOCK_ADJUSTMENT_START
  };
};

const createStockAdjustmentSuccess = stockadjustment => {
  return {
    type: CREATE_STOCK_ADJUSTMENT_SUCCESS,
    stockadjustment
  };
};

const createStockAdjustmentFail = error => {
  return {
    type: CREATE_STOCK_ADJUSTMENT_FAIL,
    error: error
  };
};

const getStockAdjustmentDetailStart = () => {
  return {
    type: GET_STOCK_ADJUSTMENT_START
  };
};

const getStockAdjustmentDetailSuccess = stockadjustment => {
  return {
    type: GET_STOCK_ADJUSTMENT_SUCCESS,
    stockadjustment
  };
};

const getStockAdjustmentDetailFail = error => {
  return {
    type: GET_STOCK_ADJUSTMENT_FAIL,
    error: error
  };
};

export const getStockAdjustments = (token) => {
  return dispatch => {
      dispatch(getStockAdjustmentListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(stockadjustmentsURL, headers)
        .then(res => {
          const stockadjustments = res.data;
          dispatch(getStockAdjustmentListSuccess(stockadjustments));
          })
        .catch(err => {
          dispatch(getStockAdjustmentListStart(err));
        });
    };
};

export const getStockAdjustment = (id, token) => {
  return dispatch => {
      dispatch(getStockAdjustmentDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${stockadjustmentsURL}${id}`, headers)
        .then(res => {
          const stockadjustment = res.data;
          dispatch(getStockAdjustmentDetailSuccess(stockadjustment));
          })
        .catch(err => {
          dispatch(getStockAdjustmentDetailFail(err));
        });
    };
};

export const addStockAdjustment = (stockadjustment, token) => {
  return dispatch => {
      dispatch(createStockAdjustmentStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(stockadjustmentsURL, stockadjustment, headers)
        .then(res => {
          dispatch(createStockAdjustmentSuccess(stockadjustment));
        })
        .catch(err => {
          dispatch(createStockAdjustmentFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editStockAdjustment = (id, stockadjustment, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${stockadjustmentsURL}${id}/`, stockadjustment, headers)
    .then(res => {
        dispatch({
            type: EDIT_STOCK_ADJUSTMENT,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
