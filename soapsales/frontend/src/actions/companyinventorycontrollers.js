import axios from 'axios';
import {
    GET_COMPANY_INVENTORY_CONTROLLERS_START,
    GET_COMPANY_INVENTORY_CONTROLLERS_SUCCESS,
    GET_COMPANY_INVENTORY_CONTROLLERS_FAIL,
    CREATE_COMPANY_INVENTORY_CONTROLLER_START,
    CREATE_COMPANY_INVENTORY_CONTROLLER_SUCCESS,
    CREATE_COMPANY_INVENTORY_CONTROLLER_FAIL,
    GET_COMPANY_INVENTORY_CONTROLLER_START,
    GET_COMPANY_INVENTORY_CONTROLLER_SUCCESS,
    GET_COMPANY_INVENTORY_CONTROLLER_FAIL,
    EDIT_COMPANY_INVENTORY_CONTROLLER
    } from '../types/companyinventorycontrollerTypes';
import { companyinventorycontrollersURL } from '../constants';

//company inventory controllers
const getCompanyInventoryControllerListStart = () => {
  return {
    type: GET_COMPANY_INVENTORY_CONTROLLERS_START
  };
};

const getCompanyInventoryControllerListSuccess = companyinventorycontrollers => {
  return {
    type: GET_COMPANY_INVENTORY_CONTROLLERS_SUCCESS,
    companyinventorycontrollers
  };
};

const getCompanyInventoryControllerListFail = error => {
  return {
    type: GET_COMPANY_INVENTORY_CONTROLLERS_FAIL,
    error: error
  };
};

const createCompanyInventoryControllerStart = () => {
  return {
    type: CREATE_COMPANY_INVENTORY_CONTROLLER_START
  };
};


const createCompanyInventoryControllerSuccess = companyinventorycontroller => {
  return {
    type: CREATE_COMPANY_INVENTORY_CONTROLLER_SUCCESS,
    companyinventorycontroller
  };
};

const createCompanyInventoryControllerFail = error => {
  return {
    type: CREATE_COMPANY_INVENTORY_CONTROLLER_FAIL,
    error: error
  };
};

const getCompanyInventoryControllerDetailStart = () => {
  return {
    type: GET_COMPANY_INVENTORY_CONTROLLER_START
  };
};

const getCompanyInventoryControllerDetailSuccess = companyinventorycontroller => {
  return {
    type: GET_COMPANY_INVENTORY_CONTROLLER_SUCCESS,
    companyinventorycontroller
  };
};

const getCompanyInventoryControllerDetailFail = error => {
  return {
    type: GET_COMPANY_INVENTORY_CONTROLLER_FAIL,
    error: error
  };
};

export const getCompanyInventoryControllers = (token) => {
  return dispatch => {
      dispatch(getCompanyInventoryControllerListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(companyinventorycontrollersURL, headers)
        .then(res => {
          const companyinventorycontrollers = res.data;
          dispatch(getCompanyInventoryControllerListSuccess(companyinventorycontrollers));
          })
        .catch(err => {
          dispatch(getCompanyInventoryControllerListStart(err));
        });
    };
};

export const getCompanyInventoryController = (id, token) => {
  return dispatch => {
      dispatch(getCompanyInventoryControllerDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${companyinventorycontrollersURL}${id}`, headers)
        .then(res => {
          const companyinventorycontroller = res.data;
          dispatch(getCompanyInventoryControllerDetailSuccess(companyinventorycontroller));
          })
        .catch(err => {
          dispatch(getCompanyInventoryControllerDetailFail(err));
        });
    };
};

export const addCompanyInventoryController = (companyinventorycontroller, token) => {
  return dispatch => {
      dispatch(createCompanyInventoryControllerStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(companyinventorycontrollersURL, companyinventorycontroller, headers)
        .then(res => {
          dispatch(createCompanyInventoryControllerSuccess(companyinventorycontroller));
        })
        .catch(err => {
          dispatch(createCompanyInventoryControllerFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editCompanyInventoryController = (id, companyinventorycontroller, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${companyinventorycontrollersURL}${id}/`, companyinventorycontroller, headers)
    .then(res => {
        dispatch({
            type: EDIT_COMPANY_INVENTORY_CONTROLLER,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
