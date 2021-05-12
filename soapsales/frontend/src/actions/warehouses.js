import axios from 'axios';
import {
    GET_WAREHOUSES_START,
    GET_WAREHOUSES_SUCCESS,
    GET_WAREHOUSES_FAIL,
    CREATE_WAREHOUSE_START,
    CREATE_WAREHOUSE_SUCCESS,
    CREATE_WAREHOUSE_FAIL,
    GET_WAREHOUSE_START,
    GET_WAREHOUSE_SUCCESS,
    GET_WAREHOUSE_FAIL,
    EDIT_WAREHOUSE
    } from '../types/warehouseTypes';
import { warehousesURL } from '../constants';

//warehouses
const getWarehouseListStart = () => {
  return {
    type: GET_WAREHOUSES_START
  };
};

const getWarehouseListSuccess = warehouses => {
  return {
    type: GET_WAREHOUSES_SUCCESS,
    warehouses
  };
};

const getWarehouseListFail = error => {
  return {
    type: GET_WAREHOUSES_FAIL,
    error: error
  };
};

const createWarehouseStart = () => {
  return {
    type: CREATE_WAREHOUSE_START
  };
};


const createWarehouseSuccess = warehouse => {
  return {
    type: CREATE_WAREHOUSE_SUCCESS,
    warehouse
  };
};

const createWarehouseFail = error => {
  return {
    type: CREATE_WAREHOUSE_FAIL,
    error: error
  };
};

const getWarehouseDetailStart = () => {
  return {
    type: GET_WAREHOUSE_START
  };
};

const getWarehouseDetailSuccess = warehouse => {
  return {
    type: GET_WAREHOUSE_SUCCESS,
    warehouse
  };
};

const getWarehouseDetailFail = error => {
  return {
    type: GET_WAREHOUSE_FAIL,
    error: error
  };
};

export const getWarehouses = (token) => {
  return dispatch => {
      dispatch(getWarehouseListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(warehousesURL, headers)
        .then(res => {
          const warehouses = res.data;
          dispatch(getWarehouseListSuccess(warehouses));
          })
        .catch(err => {
          dispatch(getWarehouseListStart(err));
        });
    };
};

export const getWarehouse = (id, token) => {
  return dispatch => {
      dispatch(getWarehouseDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${warehousesURL}${id}`, headers)
        .then(res => {
          const warehouse = res.data;
          dispatch(getWarehouseDetailSuccess(warehouse));
          })
        .catch(err => {
          dispatch(getWarehouseDetailFail(err));
        });
    };
};

export const addWarehouse = (warehouse, token) => {
  return dispatch => {
      dispatch(createWarehouseStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(warehousesURL, warehouse, headers)
        .then(res => {
          dispatch(createWarehouseSuccess(warehouse));
        })
        .catch(err => {
          dispatch(createWarehouseFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editWarehouse = (id, warehouse, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${warehousesURL}${id}/`, warehouse, headers)
    .then(res => {
        dispatch({
            type: EDIT_WAREHOUSE,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

