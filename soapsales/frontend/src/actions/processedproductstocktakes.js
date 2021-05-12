import axios from 'axios';
import { 
    GET_PROCESSED_PRODUCT_STOCK_TAKES_START,
    GET_PROCESSED_PRODUCT_STOCK_TAKES_SUCCESS,
    GET_PROCESSED_PRODUCT_STOCK_TAKES_FAIL,
    CREATE_PROCESSED_PRODUCT_STOCK_TAKE_START,
    CREATE_PROCESSED_PRODUCT_STOCK_TAKE_SUCCESS,
    CREATE_PROCESSED_PRODUCT_STOCK_TAKE_FAIL,
    GET_PROCESSED_PRODUCT_STOCK_TAKE_START,
    GET_PROCESSED_PRODUCT_STOCK_TAKE_SUCCESS,
    GET_PROCESSED_PRODUCT_STOCK_TAKE_FAIL,
    EDIT_PROCESSED_PRODUCT_STOCK_TAKE 
} from '../types/processedproductstocktakeTypes';
import { processedproductstocktakesURL } from '../constants';

//processed product stock takes
const getProcessedProductStockTakeListStart = () => {
  return {
    type: GET_PROCESSED_PRODUCT_STOCK_TAKES_START
  };
};

const getProcessedProductStockTakeListSuccess = processedproductstocktakes => {
  return {
    type: GET_PROCESSED_PRODUCT_STOCK_TAKES_SUCCESS,
    processedproductstocktakes
  };
};

const getProcessedProductStockTakeListFail = error => {
  return {
    type: GET_PROCESSED_PRODUCT_STOCK_TAKES_FAIL,
    error: error
  };
};

const createProcessedProductStockTakeStart = () => {
  return {
    type: CREATE_PROCESSED_PRODUCT_STOCK_TAKE_START
  };
};


const createProcessedProductStockTakeSuccess = processedproductstocktake => {
  return {
    type: CREATE_PROCESSED_PRODUCT_STOCK_TAKE_SUCCESS,
    processedproductstocktake
  };
};

const createProcessedProductStockTakeFail = error => {
  return {
    type: CREATE_PROCESSED_PRODUCT_STOCK_TAKE_FAIL,
    error: error
  };
};

const getProcessedProductStockTakeDetailStart = () => {
  return {
    type: GET_PROCESSED_PRODUCT_STOCK_TAKE_START
  };
};

const getProcessedProductStockTakeDetailSuccess = processedproductstocktake => {
  return {
    type: GET_PROCESSED_PRODUCT_STOCK_TAKE_SUCCESS,
    processedproductstocktake
  };
};

const getProcessedProductStockTakeDetailFail = error => {
  return {
    type: GET_PROCESSED_PRODUCT_STOCK_TAKE_FAIL,
    error: error
  };
};

export const getProcessedProductStockTakes = (token) => {
  return dispatch => {
      dispatch(getProcessedProductStockTakeListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(processedproductstocktakesURL, headers)
        .then(res => {
          const processedproductstocktakes = res.data;
          dispatch(getProcessedProductStockTakeListSuccess(processedproductstocktakes));
          })
        .catch(err => {
          dispatch(getProcessedProductStockTakeListStart(err));
        });
    };
};

export const getProcessedProductStockTake = (id, token) => {
  return dispatch => {
      dispatch(getProcessedProductStockTakeDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${processedproductstocktakesURL}${id}`, headers)
        .then(res => {
          const processedproductstocktake = res.data;
          dispatch(getProcessedProductStockTakeDetailSuccess(processedproductstocktake));
          })
        .catch(err => {
          dispatch(getProcessedProductStockTakeDetailFail(err));
        });
    };
};

export const addProcessedProductStockTake = (processedproductstocktake, token) => {
  return dispatch => {
      dispatch(createProcessedProductStockTakeStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(processedproductstocktakesURL, processedproductstocktake, headers)
        .then(res => {
          dispatch(createProcessedProductStockTakeSuccess(processedproductstocktake));
        })
        .catch(err => {
          dispatch(createProcessedProductStockTakeFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editProcessedProductStockTake = (id, processedproductstocktake, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${processedproductstocktakesURL}${id}/`, processedproductstocktake, headers)
    .then(res => {
        dispatch({
            type: EDIT_PROCESSED_PRODUCT_STOCK_TAKE,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
