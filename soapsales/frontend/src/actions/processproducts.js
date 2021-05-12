import axios from 'axios';
import { 
    GET_PROCESS_PRODUCTS_START,
    GET_PROCESS_PRODUCTS_SUCCESS,
    GET_PROCESS_PRODUCTS_FAIL,
    CREATE_PROCESS_PRODUCT_START,
    CREATE_PROCESS_PRODUCT_SUCCESS,
    CREATE_PROCESS_PRODUCT_FAIL,
    GET_PROCESS_PRODUCT_START,
    GET_PROCESS_PRODUCT_SUCCESS,
    GET_PROCESS_PRODUCT_FAIL,
    EDIT_PROCESS_PRODUCT 
} from '../types/processproductTypes';
import { processproductsURL } from '../constants';

//process products
const getProcessProductListStart = () => {
  return {
    type: GET_PROCESS_PRODUCTS_START
  };
};

const getProcessProductListSuccess = processproducts => {
  return {
    type: GET_PROCESS_PRODUCTS_SUCCESS,
    processproducts
  };
};

const getProcessProductListFail = error => {
  return {
    type: GET_PROCESS_PRODUCTS_FAIL,
    error: error
  };
};

const createProcessProductStart = () => {
  return {
    type: CREATE_PROCESS_PRODUCT_START
  };
};


const createProcessProductSuccess = processproduct => {
  return {
    type: CREATE_PROCESS_PRODUCT_SUCCESS,
    processproduct
  };
};

const createProcessProductFail = error => {
  return {
    type: CREATE_PROCESS_PRODUCT_FAIL,
    error: error
  };
};

const getProcessProductDetailStart = () => {
  return {
    type: GET_PROCESS_PRODUCT_START
  };
};

const getProcessProductDetailSuccess = processproduct => {
  return {
    type: GET_PROCESS_PRODUCT_SUCCESS,
    processproduct
  };
};

const getProcessProductDetailFail = error => {
  return {
    type: GET_PROCESS_PRODUCT_FAIL,
    error: error
  };
};

export const getProcessProducts = (token) => {
  return dispatch => {
      dispatch(getProcessProductListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(processproductsURL, headers)
        .then(res => {
          const processproducts = res.data;
          dispatch(getProcessProductListSuccess(processproducts));
          })
        .catch(err => {
          dispatch(getProcessProductListStart(err));
        });
    };
};

export const getProcessProduct = (id, token) => {
  return dispatch => {
      dispatch(getProcessProductDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${processproductsURL}${id}`, headers)
        .then(res => {
          const processproduct = res.data;
          dispatch(getProcessProductDetailSuccess(processproduct));
          })
        .catch(err => {
          dispatch(getProcessProductDetailFail(err));
        });
    };
};

export const addProcessProduct = (processproduct, token) => {
  return dispatch => {
      dispatch(createProcessProductStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(processproductsURL, processproduct, headers)
        .then(res => {
          dispatch(createProcessProductSuccess(processproduct));
        })
        .catch(err => {
          dispatch(createProcessProductFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editProcessProduct = (id, processproduct, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${processproductsURL}${id}/`, processproduct, headers)
    .then(res => {
        dispatch({
            type: EDIT_PROCESS_PRODUCT,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
