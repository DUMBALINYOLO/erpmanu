import axios from 'axios';
import {
    GET_COMPANY_PAYROLL_OFFICERS_START,
    GET_COMPANY_PAYROLL_OFFICERS_SUCCESS,
    GET_COMPANY_PAYROLL_OFFICERS_FAIL,
    CREATE_COMPANY_PAYROLL_OFFICER_START,
    CREATE_COMPANY_PAYROLL_OFFICER_SUCCESS,
    CREATE_COMPANY_PAYROLL_OFFICER_FAIL,
    GET_COMPANY_PAYROLL_OFFICER_START,
    GET_COMPANY_PAYROLL_OFFICER_SUCCESS,
    GET_COMPANY_PAYROLL_OFFICER_FAIL,
    EDIT_COMPANY_PAYROLL_OFFICER
    } from '../types/companypayrollofficerTypes';
import { companypayrollofficersURL } from '../constants';

//company payroll officers
const getCompanyPayrollOfficerListStart = () => {
  return {
    type: GET_COMPANY_PAYROLL_OFFICERS_START
  };
};

const getCompanyPayrollOfficerListSuccess = companypayrollofficers => {
  return {
    type: GET_COMPANY_PAYROLL_OFFICERS_SUCCESS,
    companypayrollofficers
  };
};

const getCompanyPayrollOfficerListFail = error => {
  return {
    type: GET_COMPANY_PAYROLL_OFFICERS_FAIL,
    error: error
  };
};

const createCompanyPayrollOfficerStart = () => {
  return {
    type: CREATE_COMPANY_PAYROLL_OFFICER_START
  };
};


const createCompanyPayrollOfficerSuccess = companypayrollofficer => {
  return {
    type: CREATE_COMPANY_PAYROLL_OFFICER_SUCCESS,
    companypayrollofficer
  };
};

const createCompanyPayrollOfficerFail = error => {
  return {
    type: CREATE_COMPANY_PAYROLL_OFFICER_FAIL,
    error: error
  };
};

const getCompanyPayrollOfficerDetailStart = () => {
  return {
    type: GET_COMPANY_PAYROLL_OFFICER_START
  };
};

const getCompanyPayrollOfficerDetailSuccess = companypayrollofficer => {
  return {
    type: GET_COMPANY_PAYROLL_OFFICER_SUCCESS,
    companypayrollofficer
  };
};

const getCompanyPayrollOfficerDetailFail = error => {
  return {
    type: GET_COMPANY_PAYROLL_OFFICER_FAIL,
    error: error
  };
};

export const getCompanyPayrollOfficers = (token) => {
  return dispatch => {
      dispatch(getCompanyPayrollOfficerListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(companypayrollofficersURL, headers)
        .then(res => {
          const companypayrollofficers = res.data;
          dispatch(getCompanyPayrollOfficerListSuccess(companypayrollofficers));
          })
        .catch(err => {
          dispatch(getCompanyPayrollOfficerListStart(err));
        });
    };
};

export const getCompanyPayrollOfficer = (id, token) => {
  return dispatch => {
      dispatch(getCompanyPayrollOfficerDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${companypayrollofficersURL}${id}`, headers)
        .then(res => {
          const companypayrollofficer = res.data;
          dispatch(getCompanyPayrollOfficerDetailSuccess(companypayrollofficer));
          })
        .catch(err => {
          dispatch(getCompanyPayrollOfficerDetailFail(err));
        });
    };
};

export const addCompanyPayrollOfficer = (companypayrollofficer, token) => {
  return dispatch => {
      dispatch(createCompanyPayrollOfficerStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(companypayrollofficersURL, companypayrollofficer, headers)
        .then(res => {
          dispatch(createCompanyPayrollOfficerSuccess(companypayrollofficer));
        })
        .catch(err => {
          dispatch(createCompanyPayrollOfficerFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editCompanyPayrollOfficer = (id, companypayrollofficer, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${companypayrollofficersURL}${id}/`, companypayrollofficer, headers)
    .then(res => {
        dispatch({
            type: EDIT_COMPANY_PAYROLL_OFFICER,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
