import axios from 'axios';
import {
    GET_ASSETS_START,
    GET_ASSETS_SUCCESS,
    GET_ASSETS_FAIL,
    CREATE_ASSET_START,
    CREATE_ASSET_SUCCESS,
    CREATE_ASSET_FAIL,
    GET_ASSET_START,
    GET_ASSET_SUCCESS,
    GET_ASSET_FAIL,
    EDIT_ASSET
    } from '../types/assetTypes';
import { assetsURL } from '../constants';

//assets
const getAssetListStart = () => {
  return {
    type: GET_ASSETS_START
  };
};

const getAssetListSuccess = assets => {
  return {
    type: GET_ASSETS_SUCCESS,
    assets
  };
};

const getAssetListFail = error => {
  return {
    type: GET_ASSETS_FAIL,
    error: error
  };
};

const createAssetStart = () => {
  return {
    type: CREATE_ASSET_START
  };
};

const createAssetSuccess = asset => {
  return {
    type: CREATE_ASSET_SUCCESS,
    asset
  };
};

const createAssetFail = error => {
  return {
    type: CREATE_ASSET_FAIL,
    error: error
  };
};

const getAssetDetailStart = () => {
  return {
    type: GET_ASSET_START
  };
};

const getAssetDetailSuccess = asset => {
  return {
    type: GET_ASSET_SUCCESS,
    asset
  };
};

const getAssetDetailFail = error => {
  return {
    type: GET_ASSET_FAIL,
    error: error
  };
};

export const getAssets = (token) => {
  return dispatch => {
      dispatch(getAssetListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(assetsURL, headers)
        .then(res => {
          const assets = res.data;
          dispatch(getAssetListSuccess(assets));
          })
        .catch(err => {
          dispatch(getAssetListStart(err));
        });
    };
};

export const getAsset = (id, token) => {
  return dispatch => {
      dispatch(getAssetDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${assetsURL}${id}`, headers)
        .then(res => {
          const asset = res.data;
          dispatch(getAssetDetailSuccess(asset));
          })
        .catch(err => {
          dispatch(getAssetDetailFail(err));
        });
    };
};

export const addAsset = (asset, token) => {
  return dispatch => {
      dispatch(createAssetStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(assetsURL, asset, headers)
        .then(res => {
          dispatch(createAssetSuccess(asset));
        })
        .catch(err => {
          dispatch(createAssetFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editAsset = (id, asset, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${assetsURL}${id}/`, asset, headers)
    .then(res => {
        dispatch({
            type: EDIT_ASSET,
            payload: res.data
        });
    }).catch(err => console.log(err))
}

