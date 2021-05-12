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
import { updateObject } from "../utility";

const initialState = {
    assets: [],
    asset: {},
    loading: false,
    error: null,
}

const getAssetListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getAssetListSuccess = (state, action) => {
  return updateObject(state, {
    assets: action.assets,
    error: null,
    loading: false
  });
};

const getAssetListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createAssetStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createAssetSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createAssetFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getAssetDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getAssetDetailSuccess = (state, action) => {
  return updateObject(state, {
    asset: action.asset,
    error: null,
    loading: false
  });
};

const getAssetDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function assets(state = initialState, action){
    switch(action.type){
        case GET_ASSETS_START:
            return getAssetListStart(state, action);
        case GET_ASSETS_SUCCESS:
            return getAssetListSuccess(state, action);
        case GET_ASSETS_FAIL:
            return getAssetListFail(state, action);
        case CREATE_ASSET_START:
            return createAssetStart(state, action);
        case CREATE_ASSET_SUCCESS:
            return createAssetSuccess(state, action);
        case CREATE_ASSET_FAIL:
            return createAssetFail(state, action);
        case GET_ASSET_START:
        return getAssetDetailStart(state, action);
        case GET_ASSET_SUCCESS:
            return getAssetDetailSuccess(state, action);
        case GET_ASSET_FAIL:
            return getAssetDetailFail(state, action);
        case EDIT_ASSET:
            const arrayList = state.assets;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                assets: arrayList,
            };
        default:
            return state;
    }
}
