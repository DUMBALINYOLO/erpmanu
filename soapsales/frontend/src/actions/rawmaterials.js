import axios from 'axios';
import {
    GET_RAW_MATERIALS_START,
    GET_RAW_MATERIALS_SUCCESS,
    GET_RAW_MATERIALS_FAIL,
    CREATE_RAW_MATERIAL_START,
    CREATE_RAW_MATERIAL_SUCCESS,
    CREATE_RAW_MATERIAL_FAIL,
    GET_RAW_MATERIAL_START,
    GET_RAW_MATERIAL_SUCCESS,
    GET_RAW_MATERIAL_FAIL,
    EDIT_RAW_MATERIAL
    } from './types';
import { rawmaterialsURL } from '../constants';

//raw materials
const getRawMaterialListStart = () => {
  return {
    type: GET_RAW_MATERIALS_START
  };
};

const getRawMaterialListSuccess = rawmaterials => {
  return {
    type: GET_RAW_MATERIALS_SUCCESS,
    rawmaterials
  };
};

const getRawMaterialListFail = error => {
  return {
    type: GET_RAW_MATERIALS_FAIL,
    error: error
  };
};

const createRawMaterialStart = () => {
  return {
    type: CREATE_RAW_MATERIAL_START
  };
};


const createRawMaterialSuccess = rawmaterial => {
  return {
    type: CREATE_RAW_MATERIAL_SUCCESS,
    rawmaterial
  };
};

const createRawMaterialFail = error => {
  return {
    type: CREATE_RAW_MATERIAL_FAIL,
    error: error
  };
};

const getRawMaterialDetailStart = () => {
  return {
    type: GET_RAW_MATERIAL_START
  };
};

const getRawMaterialDetailSuccess = rawmaterial => {
  return {
    type: GET_RAW_MATERIAL_SUCCESS,
    rawmaterial
  };
};

const getRawMaterialDetailFail = error => {
  return {
    type: GET_RAW_MATERIAL_FAIL,
    error: error
  };
};

export const getRawMaterials = (token) => {
  return dispatch => {
      dispatch(getRawMaterialListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(rawmaterialsURL, headers)
        .then(res => {
          const rawmaterials = res.data;
          dispatch(getRawMaterialListSuccess(rawmaterials));
          })
        .catch(err => {
          dispatch(getRawMaterialListStart(err));
        });
    };
};

export const getRawMaterial = (id, token) => {
  return dispatch => {
      dispatch(getRawMaterialDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${rawmaterialsURL}${id}`, headers)
        .then(res => {
          const rawmaterial = res.data;
          dispatch(getRawMaterialDetailSuccess(rawmaterial));
          })
        .catch(err => {
          dispatch(getRawMaterialDetailFail(err));
        });
    };
};

export const addRawMaterial = (rawmaterial, token) => {
  return dispatch => {
      dispatch(createRawMaterialStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(rawmaterialsURL, rawmaterial, headers)
        .then(res => {
          dispatch(createRawMaterialSuccess(rawmaterial));
        })
        .catch(err => {
          dispatch(createRawMaterialFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editRawMaterial = (id, rawmaterial, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${rawmaterialsURL}${id}/`, rawmaterial, headers)
    .then(res => {
        dispatch({
            type: EDIT_RAW_MATERIAL,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

