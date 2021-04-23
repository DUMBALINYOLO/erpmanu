import axios from 'axios';
import {
    GET_INVENTORY_CATEGORIES_START,
    GET_INVENTORY_CATEGORIES_SUCCESS,
    GET_INVENTORY_CATEGORIES_FAIL,
    CREATE_INVENTORY_CATEGORY_START,
    CREATE_INVENTORY_CATEGORY_SUCCESS,
    CREATE_INVENTORY_CATEGORY_FAIL,
    GET_INVENTORY_CATEGORY_START,
    GET_INVENTORY_CATEGORY_SUCCESS,
    GET_INVENTORY_CATEGORY_FAIL,
    EDIT_INVENTORY_CATEGORY
    } from '../types/inventorycategoryTypes';
import { inventorycategoriesURL } from '../constants';

//inventory categories
const getInventoryCategoryListStart = () => {
  return {
    type: GET_INVENTORY_CATEGORIES_START
  };
};

const getInventoryCategoryListSuccess = inventorycategories => {
  return {
    type: GET_INVENTORY_CATEGORIES_SUCCESS,
    inventorycategories
  };
};

const getInventoryCategoryListFail = error => {
  return {
    type: GET_INVENTORY_CATEGORIES_FAIL,
    error: error
  };
};

const createInventoryCategoryStart = () => {
  return {
    type: CREATE_INVENTORY_CATEGORY_START
  };
};

const createInventoryCategorySuccess = inventorycategory => {
  return {
    type: CREATE_INVENTORY_CATEGORY_SUCCESS,
    inventorycategory
  };
};

const createInventoryCategoryFail = error => {
  return {
    type: CREATE_INVENTORY_CATEGORY_FAIL,
    error: error
  };
};

const getInventoryCategoryDetailStart = () => {
  return {
    type: GET_INVENTORY_CATEGORY_START
  };
};

const getInventoryCategoryDetailSuccess = inventorycategory => {
  return {
    type: GET_INVENTORY_CATEGORY_SUCCESS,
    inventorycategory
  };
};

const getInventoryCategoryDetailFail = error => {
  return {
    type: GET_INVENTORY_CATEGORY_FAIL,
    error: error
  };
};

export const getInventoryCategories = (token) => {
  return dispatch => {
      dispatch(getInventoryCategoryListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(inventorycategoriesURL, headers)
        .then(res => {
          const inventorycategories = res.data;
          dispatch(getInventoryCategoryListSuccess(inventorycategories));
          })
        .catch(err => {
          dispatch(getInventoryCategoryListStart(err));
        });
    };
};

export const getInventoryCategory = (id, token) => {
  return dispatch => {
      dispatch(getInventoryCategoryDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${inventorycategoriesURL}${id}`, headers)
        .then(res => {
          const inventorycategory = res.data;
          dispatch(getInventoryCategoryDetailSuccess(inventorycategory));
          })
        .catch(err => {
          dispatch(getInventoryCategoryDetailFail(err));
        });
    };
};

export const addInventoryCategory = (inventorycategory, token) => {
  return dispatch => {
      dispatch(createInventoryCategoryStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(inventorycategoriesURL, inventorycategory, headers)
        .then(res => {
          dispatch(createInventoryCategorySuccess(inventorycategory));
        })
        .catch(err => {
          dispatch(createInventoryCategoryFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editInventoryCategory = (id, inventorycategory, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${inventorycategoriesURL}${id}/`, inventorycategory, headers)
    .then(res => {
        dispatch({
            type: EDIT_INVENTORY_CATEGORY,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
