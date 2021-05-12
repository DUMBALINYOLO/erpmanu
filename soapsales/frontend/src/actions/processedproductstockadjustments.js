import axios from 'axios';
import { 
    GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENTS_START,
    GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENTS_SUCCESS,
    GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENTS_FAIL,
    CREATE_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_START,
    CREATE_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_SUCCESS,
    CREATE_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_FAIL,
    GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_START,
    GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_SUCCESS,
    GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_FAIL,
    EDIT_PROCESSED_PRODUCT_STOCK_ADJUSTMENT
} from '../types/processedproductstockadjustmentTypes';
import { processedproductstockadjustmentsURL } from '../constants';

//processed product stock adjustments
const getProcessedProductStockAdjustmentListStart = () => {
  return {
    type: GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENTS_START
  };
};

const getProcessedProductStockAdjustmentListSuccess = processedproductstockadjustments => {
  return {
    type: GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENTS_SUCCESS,
    processedproductstockadjustments
  };
};

const getProcessedProductStockAdjustmentListFail = error => {
  return {
    type: GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENTS_FAIL,
    error: error
  };
};

const createProcessedProductStockAdjustmentStart = () => {
  return {
    type: CREATE_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_START
  };
};

const createProcessedProductStockAdjustmentSuccess = processedproductstockadjustment => {
  return {
    type: CREATE_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_SUCCESS,
    processedproductstockadjustment
  };
};

const createProcessedProductStockAdjustmentFail = error => {
  return {
    type: CREATE_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_FAIL,
    error: error
  };
};

const getProcessedProductStockAdjustmentDetailStart = () => {
  return {
    type: GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_START
  };
};

const getProcessedProductStockAdjustmentDetailSuccess = processedproductstockadjustment => {
  return {
    type: GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_SUCCESS,
    processedproductstockadjustment
  };
};

const getProcessedProductStockAdjustmentDetailFail = error => {
  return {
    type: GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_FAIL,
    error: error
  };
};

export const getProcessedProductStockAdjustments = (token) => {
  return dispatch => {
      dispatch(getProcessedProductStockAdjustmentListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(processedproductstockadjustmentsURL, headers)
        .then(res => {
          const processedproductstockadjustments = res.data;
          dispatch(getProcessedProductStockAdjustmentListSuccess(processedproductstockadjustments));
          })
        .catch(err => {
          dispatch(getProcessedProductStockAdjustmentListStart(err));
        });
    };
};

export const getProcessedProductStockAdjustment = (id, token) => {
  return dispatch => {
      dispatch(getProcessedProductStockAdjustmentDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${processedproductstockadjustmentsURL}${id}`, headers)
        .then(res => {
          const processedproductstockadjustment = res.data;
          dispatch(getProcessedProductStockAdjustmentDetailSuccess(processedproductstockadjustment));
          })
        .catch(err => {
          dispatch(getProcessedProductStockAdjustmentDetailFail(err));
        });
    };
};

export const addProcessedProductStockAdjustment = (processedproductstockadjustment, token) => {
  return dispatch => {
      dispatch(createProcessedProductStockAdjustmentStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(processedproductstockadjustmentsURL, processedproductstockadjustment, headers)
        .then(res => {
          dispatch(createProcessedProductStockAdjustmentSuccess(processedproductstockadjustment));
        })
        .catch(err => {
          dispatch(createProcessedProductStockAdjustmentFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editProcessedProductStockAdjustment = (id, processedproductstockadjustment, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${processedproductstockadjustmentsURL}${id}/`, processedproductstockadjustment, headers)
    .then(res => {
        dispatch({
            type: EDIT_PROCESSED_PRODUCT_STOCK_ADJUSTMENT,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
