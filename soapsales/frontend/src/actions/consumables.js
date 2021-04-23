import axios from 'axios';
import {
    GET_CONSUMABLES_START,
    GET_CONSUMABLES_SUCCESS,
    GET_CONSUMABLES_FAIL,
    CREATE_CONSUMABLE_START,
    CREATE_CONSUMABLE_SUCCESS,
    CREATE_CONSUMABLE_FAIL,
    GET_CONSUMABLE_START,
    GET_CONSUMABLE_SUCCESS,
    GET_CONSUMABLE_FAIL,
    EDIT_CONSUMABLE
    } from '../types/consumableTypes';
import { consumablesURL } from '../constants';

//consumables
const getConsumableListStart = () => {
  return {
    type: GET_CONSUMABLES_START
  };
};

const getConsumableListSuccess = consumables => {
  return {
    type: GET_CONSUMABLES_SUCCESS,
    consumables
  };
};

const getConsumableListFail = error => {
  return {
    type: GET_CONSUMABLES_FAIL,
    error: error
  };
};

const createConsumableStart = () => {
  return {
    type: CREATE_CONSUMABLE_START
  };
};


const createConsumableSuccess = consumable => {
  return {
    type: CREATE_CONSUMABLE_SUCCESS,
    consumable
  };
};

const createConsumableFail = error => {
  return {
    type: CREATE_CONSUMABLE_FAIL,
    error: error
  };
};

const getConsumableDetailStart = () => {
  return {
    type: GET_CONSUMABLE_START
  };
};

const getConsumableDetailSuccess = consumable => {
  return {
    type: GET_CONSUMABLE_SUCCESS,
    consumable
  };
};

const getConsumableDetailFail = error => {
  return {
    type: GET_CONSUMABLE_FAIL,
    error: error
  };
};

export const getConsumables = (token) => {
  return dispatch => {
      dispatch(getConsumableListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(consumablesURL, headers)
        .then(res => {
          const consumables = res.data;
          dispatch(getConsumableListSuccess(consumables));
          })
        .catch(err => {
          dispatch(getConsumableListStart(err));
        });
    };
};

export const getConsumable = (id, token) => {
  return dispatch => {
      dispatch(getConsumableDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${consumablesURL}${id}`, headers)
        .then(res => {
          const consumable = res.data;
          dispatch(getConsumableDetailSuccess(consumable));
          })
        .catch(err => {
          dispatch(getConsumableDetailFail(err));
        });
    };
};

export const addConsumable = (consumable, token) => {
  return dispatch => {
      dispatch(createConsumableStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(consumablesURL, consumable, headers)
        .then(res => {
          dispatch(createConsumableSuccess(consumable));
        })
        .catch(err => {
          dispatch(createConsumableFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editConsumable = (id, consumable, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${consumablesURL}${id}/`, consumable, headers)
    .then(res => {
        dispatch({
            type: EDIT_CONSUMABLE,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
