import axios from 'axios';
import {
    GET_COMPANY_SHAREHOLDERS_START,
    GET_COMPANY_SHAREHOLDERS_SUCCESS,
    GET_COMPANY_SHAREHOLDERS_FAIL,
    CREATE_COMPANY_SHAREHOLDER_START,
    CREATE_COMPANY_SHAREHOLDER_SUCCESS,
    CREATE_COMPANY_SHAREHOLDER_FAIL,
    GET_COMPANY_SHAREHOLDER_START,
    GET_COMPANY_SHAREHOLDER_SUCCESS,
    GET_COMPANY_SHAREHOLDER_FAIL,
    EDIT_COMPANY_SHAREHOLDER
    } from '../types/companyshareholderTypes';
import { companyshareholdersURL } from '../constants';

//company shareholders
const getCompanyShareholderListStart = () => {
  return {
    type: GET_COMPANY_SHAREHOLDERS_START
  };
};

const getCompanyShareholderListSuccess = companyshareholders => {
  return {
    type: GET_COMPANY_SHAREHOLDERS_SUCCESS,
    companyshareholders
  };
};

const getCompanyShareholderListFail = error => {
  return {
    type: GET_COMPANY_SHAREHOLDERS_FAIL,
    error: error
  };
};

const createCompanyShareholderStart = () => {
  return {
    type: CREATE_COMPANY_SHAREHOLDER_START
  };
};


const createCompanyShareholderSuccess = companyshareholder => {
  return {
    type: CREATE_COMPANY_SHAREHOLDER_SUCCESS,
    companyshareholder
  };
};

const createCompanyShareholderFail = error => {
  return {
    type: CREATE_COMPANY_SHAREHOLDER_FAIL,
    error: error
  };
};

const getCompanyShareholderDetailStart = () => {
  return {
    type: GET_COMPANY_SHAREHOLDER_START
  };
};

const getCompanyShareholderDetailSuccess = companyshareholder => {
  return {
    type: GET_COMPANY_SHAREHOLDER_SUCCESS,
    companyshareholder
  };
};

const getCompanyShareholderDetailFail = error => {
  return {
    type: GET_COMPANY_SHAREHOLDER_FAIL,
    error: error
  };
};

export const getCompanyShareholders = (token) => {
  return dispatch => {
      dispatch(getCompanyShareholderListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(companyshareholdersURL, headers)
        .then(res => {
          const companyshareholders = res.data;
          dispatch(getCompanyShareholderListSuccess(companyshareholders));
          })
        .catch(err => {
          dispatch(getCompanyShareholderListStart(err));
        });
    };
};

export const getCompanyShareholder = (id, token) => {
  return dispatch => {
      dispatch(getCompanyShareholderDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${companyshareholdersURL}${id}`, headers)
        .then(res => {
          const companyshareholder = res.data;
          dispatch(getCompanyShareholderDetailSuccess(companyshareholder));
          })
        .catch(err => {
          dispatch(getCompanyShareholderDetailFail(err));
        });
    };
};

export const addCompanyShareholder = (companyshareholder, token) => {
  return dispatch => {
      dispatch(createCompanyShareholderStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(companyshareholdersURL, companyshareholder, headers)
        .then(res => {
          dispatch(createCompanyShareholderSuccess(companyshareholder));
        })
        .catch(err => {
          dispatch(createCompanyShareholderFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editCompanyShareholder = (id, companyshareholder, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${companyshareholdersURL}${id}/`, companyshareholder, headers)
    .then(res => {
        dispatch({
            type: EDIT_COMPANY_SHAREHOLDER,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
