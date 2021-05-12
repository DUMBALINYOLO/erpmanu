import axios from 'axios';
import { 
    GET_PAYMENTS_START,
    GET_PAYMENTS_SUCCESS,
    GET_PAYMENTS_FAIL,
    CREATE_PAYMENT_START,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAIL,
    GET_PAYMENT_START,
    GET_PAYMENT_SUCCESS,
    GET_PAYMENT_FAIL,
    EDIT_PAYMENT 
} from '../types/paymentTypes';
import { paymentsURL } from '../constants';

//payments
const getPaymentListStart = () => {
  return {
    type: GET_PAYMENTS_START
  };
};

const getPaymentListSuccess = payments => {
  return {
    type: GET_PAYMENTS_SUCCESS,
    payments
  };
};

const getPaymentListFail = error => {
  return {
    type: GET_PAYMENTS_FAIL,
    error: error
  };
};

const createPaymentStart = () => {
  return {
    type: CREATE_PAYMENT_START
  };
};

const createPaymentSuccess = payment => {
  return {
    type: CREATE_PAYMENT_SUCCESS,
    payment
  };
};

const createPaymentFail = error => {
  return {
    type: CREATE_PAYMENT_FAIL,
    error: error
  };
};

const getPaymentDetailStart = () => {
  return {
    type: GET_PAYMENT_START
  };
};

const getPaymentDetailSuccess = payment => {
  return {
    type: GET_PAYMENT_SUCCESS,
    payment
  };
};

const getInventoryCategoryDetailFail = error => {
  return {
    type: GET_PAYMENT_FAIL,
    error: error
  };
};

export const getPayments = (token) => {
  return dispatch => {
      dispatch(getPaymentListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(paymentsURL, headers)
        .then(res => {
          const payments = res.data;
          dispatch(getPaymentListSuccess(payments));
          })
        .catch(err => {
          dispatch(getPaymentListStart(err));
        });
    };
};

export const getPayment = (id, token) => {
  return dispatch => {
      dispatch(getPaymentDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${paymentsURL}${id}`, headers)
        .then(res => {
          const payment = res.data;
          dispatch(getPaymentDetailSuccess(payment));
          })
        .catch(err => {
          dispatch(getPaymentDetailFail(err));
        });
    };
};

export const addPayment = (payment, token) => {
  return dispatch => {
      dispatch(createPaymentStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(paymentsURL, payment, headers)
        .then(res => {
          dispatch(createPaymentSuccess(payment));
        })
        .catch(err => {
          dispatch(createPaymentFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editPayment = (id, payment, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${paymentsURL}${id}/`, payment, headers)
    .then(res => {
        dispatch({
            type: EDIT_PAYMENT,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
