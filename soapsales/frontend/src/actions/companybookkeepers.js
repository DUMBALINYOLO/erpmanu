import axios from 'axios';
import {
    GET_COMPANY_BOOKKEEPERS_START,
    GET_COMPANY_BOOKKEEPERS_SUCCESS,
    GET_COMPANY_BOOKKEEPERS_FAIL,
    CREATE_COMPANY_BOOKKEEPER_START,
    CREATE_COMPANY_BOOKKEEPER_SUCCESS,
    CREATE_COMPANY_BOOKKEEPER_FAIL,
    GET_COMPANY_BOOKKEEPER_START,
    GET_COMPANY_BOOKKEEPER_SUCCESS,
    GET_COMPANY_BOOKKEEPER_FAIL,
    EDIT_COMPANY_BOOKKEEPER
    } from '../types/companybookkeeperTypes';
import { companybookkeepersURL } from '../constants';

//company bookkeepers
const getCompanyBookkeeperListStart = () => {
  return {
    type: GET_COMPANY_BOOKKEEPERS_START
  };
};

const getCompanyBookkeeperListSuccess = companybookkeepers => {
  return {
    type: GET_COMPANY_BOOKKEEPERS_SUCCESS,
    companybookkeepers
  };
};

const getCompanyBookkeeperListFail = error => {
  return {
    type: GET_COMPANY_BOOKKEEPERS_FAIL,
    error: error
  };
};

const createCompanyBookkeeperStart = () => {
  return {
    type: CREATE_COMPANY_BOOKKEEPER_START
  };
};


const createCompanyBookkeeperSuccess = companybookkeeper => {
  return {
    type: CREATE_COMPANY_BOOKKEEPER_SUCCESS,
    companybookkeeper
  };
};

const createCompanyBookkeeperFail = error => {
  return {
    type: CREATE_COMPANY_BOOKKEEPER_FAIL,
    error: error
  };
};

const getCompanyBookkeeperDetailStart = () => {
  return {
    type: GET_COMPANY_BOOKKEEPER_START
  };
};

const getCompanyBookkeeperDetailSuccess = companybookkeeper => {
  return {
    type: GET_COMPANY_BOOKKEEPER_SUCCESS,
    companybookkeeper
  };
};

const getCompanyBookkeeperDetailFail = error => {
  return {
    type: GET_COMPANY_BOOKKEEPER_FAIL,
    error: error
  };
};

export const getCompanyBookkeepers = (token) => {
  return dispatch => {
      dispatch(getCompanyBookkeeperListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(companybookkeepersURL, headers)
        .then(res => {
          const companybookkeepers = res.data;
          dispatch(getCompanyBookkeeperListSuccess(companybookkeepers));
          })
        .catch(err => {
          dispatch(getCompanyBookkeeperListStart(err));
        });
    };
};

export const getCompanyBookkeeper = (id, token) => {
  return dispatch => {
      dispatch(getCompanyBookkeeperDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${companybookkeepersURL}${id}`, headers)
        .then(res => {
          const companybookkeeper = res.data;
          dispatch(getCompanyBookkeeperDetailSuccess(companybookkeeper));
          })
        .catch(err => {
          dispatch(getCompanyBookkeeperDetailFail(err));
        });
    };
};

export const addCompanyBookkeeper = (companybookkeeper, token) => {
  return dispatch => {
      dispatch(createCompanyBookkeeperStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(companybookkeepersURL, companybookkeeper, headers)
        .then(res => {
          dispatch(createCompanyBookkeeperSuccess(companybookkeeper));
        })
        .catch(err => {
          dispatch(createCompanyBookkeeperFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editCompanyBookkeeper = (id, companybookkeeper, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${companybookkeepersURL}${id}/`, companybookkeeper, headers)
    .then(res => {
        dispatch({
            type: EDIT_COMPANY_BOOKKEEPER,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
