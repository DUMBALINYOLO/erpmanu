import axios from 'axios';
import {
    GET_STORAGE_MEDIAS_START,
    GET_STORAGE_MEDIAS_SUCCESS,
    GET_STORAGE_MEDIAS_FAIL,
    CREATE_STORAGE_MEDIA_START,
    CREATE_STORAGE_MEDIA_SUCCESS,
    CREATE_STORAGE_MEDIA_FAIL,
    GET_STORAGE_MEDIA_START,
    GET_STORAGE_MEDIA_SUCCESS,
    GET_STORAGE_MEDIA_FAIL,
    EDIT_STORAGE_MEDIA
    } from '../types/storagemediaTypes';
import { storagemediasURL } from '../constants';

//accounting adjustments
const getStorageMediaListStart = () => {
  return {
    type: GET_STORAGE_MEDIAS_START
  };
};

const getStorageMediaListSuccess = storagemedias => {
  return {
    type: GET_STORAGE_MEDIAS_SUCCESS,
    storagemedias
  };
};

const getStorageMediaListFail = error => {
  return {
    type: GET_STORAGE_MEDIAS_FAIL,
    error: error
  };
};

const createStorageMediaStart = () => {
  return {
    type: CREATE_STORAGE_MEDIA_START
  };
};


const createStorageMediaSuccess = storagemedia => {
  return {
    type: CREATE_STORAGE_MEDIA_SUCCESS,
    storagemedia
  };
};

const createStorageMediaFail = error => {
  return {
    type: CREATE_STORAGE_MEDIA_FAIL,
    error: error
  };
};

const getStorageMediaDetailStart = () => {
  return {
    type: GET_STORAGE_MEDIA_START
  };
};

const getStorageMediaDetailSuccess = storagemedia => {
  return {
    type: GET_STORAGE_MEDIA_SUCCESS,
    storagemedia
  };
};

const getStorageMediaDetailFail = error => {
  return {
    type: GET_STORAGE_MEDIA_FAIL,
    error: error
  };
};

export const getStorageMedias = (token) => {
  return dispatch => {
      dispatch(getStorageMediaListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(storagemediasURL, headers)
        .then(res => {
          const storagemedias = res.data;
          dispatch(getStorageMediaListSuccess(storagemedias));
          })
        .catch(err => {
          dispatch(getStorageMediaListStart(err));
        });
    };
};

export const getStorageMedia = (id, token) => {
  return dispatch => {
      dispatch(getStorageMediaDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${storagemediasURL}${id}`, headers)
        .then(res => {
          const storagemedia = res.data;
          dispatch(getStorageMediaDetailSuccess(storagemedia));
          })
        .catch(err => {
          dispatch(getStorageMediaDetailFail(err));
        });
    };
};

export const addStorageMedia = (storagemedia, token) => {
  return dispatch => {
      dispatch(createStorageMediaStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(storagemediasURL, storagemedia, headers)
        .then(res => {
          dispatch(createStorageMediaSuccess(storagemedia));
        })
        .catch(err => {
          dispatch(createStorageMediaFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editStorageMedia = (id, storagemedia, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${storagemediasURL}${id}/`, storagemedia, headers)
    .then(res => {
        dispatch({
            type: EDIT_STORAGE_MEDIA,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
