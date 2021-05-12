import axios from 'axios';
import {
    GET_SALES_START,
    GET_SALES_SUCCESS,
    GET_SALES_FAIL,
    CREATE_SALE_START,
    CREATE_SALE_SUCCESS,
    CREATE_SALE_FAIL,
    GET_SALE_START,
    GET_SALE_SUCCESS,
    GET_SALE_FAIL,
    EDIT_SALE
    } from '../types/saleTypes';
import { salesURL } from '../constants';

//sales
const getSaleListStart = () => {
  return {
    type: GET_SALES_START
  };
};

const getSaleListSuccess = sales => {
  return {
    type: GET_SALES_SUCCESS,
    sales
  };
};

const getSaleListFail = error => {
  return {
    type: GET_SALES_FAIL,
    error: error
  };
};

const createSaleStart = () => {
  return {
    type: CREATE_SALE_START
  };
};


const createSaleSuccess = sale => {
  return {
    type: CREATE_SALE_SUCCESS,
    sale
  };
};

const createSaleFail = error => {
  return {
    type: CREATE_SALE_FAIL,
    error: error
  };
};

const getSaleDetailStart = () => {
  return {
    type: GET_SALE_START
  };
};

const getSaleDetailSuccess = sale => {
  return {
    type: GET_SALE_SUCCESS,
    sale
  };
};

const getSaleDetailFail = error => {
  return {
    type: GET_SALE_FAIL,
    error: error
  };
};

export const getSales = (token) => {
  return dispatch => {
      dispatch(getSaleListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(salesURL, headers)
        .then(res => {
          const sales = res.data;
          dispatch(getSaleListSuccess(sales));
          })
        .catch(err => {
          dispatch(getSaleListStart(err));
        });
    };
};

export const getSale = (id, token) => {
  return dispatch => {
      dispatch(getSaleDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${salesURL}${id}`, headers)
        .then(res => {
          const sale = res.data;
          dispatch(getSaleDetailSuccess(sale));
          })
        .catch(err => {
          dispatch(getSaleDetailFail(err));
        });
    };
};

export const addSale = (sale, token) => {
  return dispatch => {
      dispatch(createSaleStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(salesURL, sale, headers)
        .then(res => {
          dispatch(createSaleSuccess(sale));
        })
        .catch(err => {
          dispatch(createSaleFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editSale = (id, sale, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${salesURL}${id}/`, sale, headers)
    .then(res => {
        dispatch({
            type: EDIT_SALE,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
