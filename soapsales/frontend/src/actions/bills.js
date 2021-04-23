import axios from 'axios';
import {
    GET_BILLS_START,
    GET_BILLS_SUCCESS,
    GET_BILLS_FAIL,
    CREATE_BILL_START,
    CREATE_BILL_SUCCESS,
    CREATE_BILL_FAIL,
    GET_BILL_START,
    GET_BILL_SUCCESS,
    GET_BILL_FAIL,
    EDIT_BILL
    } from '../types/billTypes';
import { billsURL } from '../constants';

//bills
const getBillListStart = () => {
  return {
    type: GET_BILLS_START
  };
};

const getBillListSuccess = bills => {
  return {
    type: GET_BILLS_SUCCESS,
    bills
  };
};

const getBillListFail = error => {
  return {
    type: GET_BILLS_FAIL,
    error: error
  };
};

const createBillStart = () => {
  return {
    type: CREATE_BILL_START
  };
};


const createBillSuccess = bill => {
  return {
    type: CREATE_BILL_SUCCESS,
    bill
  };
};

const createBillFail = error => {
  return {
    type: CREATE_BILL_FAIL,
    error: error
  };
};

const getBillDetailStart = () => {
  return {
    type: GET_BILL_START
  };
};

const getBillDetailSuccess = bill => {
  return {
    type: GET_BILL_SUCCESS,
    bill
  };
};

const getBillDetailFail = error => {
  return {
    type: GET_BILL_FAIL,
    error: error
  };
};

export const getBills = (token) => {
  return dispatch => {
      dispatch(getBillListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(billsURL, headers)
        .then(res => {
          const bills = res.data;
          dispatch(getBillListSuccess(bills));
          })
        .catch(err => {
          dispatch(getBillListStart(err));
        });
    };
};

export const getBill = (id, token) => {
  return dispatch => {
      dispatch(getBillDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${billsURL}${id}`, headers)
        .then(res => {
          const bill = res.data;
          dispatch(getBillDetailSuccess(bill));
          })
        .catch(err => {
          dispatch(getBillDetailFail(err));
        });
    };
};

export const addBill = (bill, token) => {
  return dispatch => {
      dispatch(createBillStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(billsURL, bill, headers)
        .then(res => {
          dispatch(createBillSuccess(bill));
        })
        .catch(err => {
          dispatch(createBillFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editBill = (id, bill, token) => dispatch => {
    const headers ={
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${billsURL}${id}/`, bill, headers)
    .then(res => {
        dispatch({
            type: EDIT_BILL,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
