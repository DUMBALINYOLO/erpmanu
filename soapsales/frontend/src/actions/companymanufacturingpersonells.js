import axios from 'axios';
import {
    GET_COMPANY_MANUFACTURING_PERSONELLS_START,
    GET_COMPANY_MANUFACTURING_PERSONELLS_SUCCESS,
    GET_COMPANY_MANUFACTURING_PERSONELLS_FAIL,
    CREATE_COMPANY_MANUFACTURING_PERSONELL_START,
    CREATE_COMPANY_MANUFACTURING_PERSONELL_SUCCESS,
    CREATE_COMPANY_MANUFACTURING_PERSONELL_FAIL,
    GET_COMPANY_MANUFACTURING_PERSONELL_START,
    GET_COMPANY_MANUFACTURING_PERSONELL_SUCCESS,
    GET_COMPANY_MANUFACTURING_PERSONELL_FAIL,
    EDIT_COMPANY_MANUFACTURING_PERSONELL
    } from '../types/companymanufacturingpersonellTypes';
import { companymanufacturingpersonellsURL } from '../constants';

//company manufacturing personells
const getCompanyManufacturingPersonellListStart = () => {
  return {
    type: GET_COMPANY_MANUFACTURING_PERSONELLS_START
  };
};

const getCompanyManufacturingPersonellListSuccess = companymanufacturingpersonells => {
  return {
    type: GET_COMPANY_MANUFACTURING_PERSONELLS_SUCCESS,
    companymanufacturingpersonells
  };
};

const getCompanyManufacturingPersonellListFail = error => {
  return {
    type: GET_COMPANY_MANUFACTURING_PERSONELLS_FAIL,
    error: error
  };
};

const createCompanyManufacturingPersonellStart = () => {
  return {
    type: CREATE_COMPANY_MANUFACTURING_PERSONELL_START
  };
};


const createCompanyManufacturingPersonellSuccess = companymanufacturingpersonell => {
  return {
    type: CREATE_COMPANY_MANUFACTURING_PERSONELL_SUCCESS,
    companymanufacturingpersonell
  };
};

const createCompanyManufacturingPersonellFail = error => {
  return {
    type: CREATE_COMPANY_MANUFACTURING_PERSONELL_FAIL,
    error: error
  };
};

const getCompanyManufacturingPersonellDetailStart = () => {
  return {
    type: GET_COMPANY_MANUFACTURING_PERSONELL_START
  };
};

const getCompanyManufacturingPersonellDetailSuccess = companymanufacturingpersonell => {
  return {
    type: GET_COMPANY_MANUFACTURING_PERSONELL_SUCCESS,
    companymanufacturingpersonell
  };
};

const getCompanyManufacturingPersonellDetailFail = error => {
  return {
    type: GET_COMPANY_MANUFACTURING_PERSONELL_FAIL,
    error: error
  };
};

export const getCompanyManufacturingPersonells = (token) => {
  return dispatch => {
      dispatch(getCompanyManufacturingPersonellListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(companymanufacturingpersonellsURL, headers)
        .then(res => {
          const companymanufacturingpersonells = res.data;
          dispatch(getCompanyManufacturingPersonellListSuccess(companymanufacturingpersonells));
          })
        .catch(err => {
          dispatch(getCompanyManufacturingPersonellListStart(err));
        });
    };
};

export const getCompanyManufacturingPersonell = (id, token) => {
  return dispatch => {
      dispatch(getCompanyManufacturingPersonellDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${companymanufacturingpersonellsURL}${id}`, headers)
        .then(res => {
          const companymanufacturingpersonell = res.data;
          dispatch(getCompanyManufacturingPersonellDetailSuccess(companymanufacturingpersonell));
          })
        .catch(err => {
          dispatch(getCompanyManufacturingPersonellDetailFail(err));
        });
    };
};

export const addCompanyManufacturingPersonell = (companymanufacturingpersonell, token) => {
  return dispatch => {
      dispatch(createCompanyManufacturingPersonellStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(companymanufacturingpersonellsURL, companymanufacturingpersonell, headers)
        .then(res => {
          dispatch(createCompanyManufacturingPersonellSuccess(companymanufacturingpersonell));
        })
        .catch(err => {
          dispatch(createCompanyManufacturingPersonellFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editCompanyManufacturingPersonell = (id, companymanufacturingpersonell, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${companymanufacturingpersonellsURL}${id}/`, companymanufacturingpersonell, headers)
    .then(res => {
        dispatch({
            type: EDIT_COMPANY_MANUFACTURING_PERSONELL,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
