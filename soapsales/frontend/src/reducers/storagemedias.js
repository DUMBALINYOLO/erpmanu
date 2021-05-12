import { 
    GET_STORAGEMEDIAS_START,
    GET_STORAGEMEDIAS_SUCCESS,
    GET_STORAGEMEDIAS_FAIL,
    GET_STORAGEMEDIA_START,
    GET_STORAGEMEDIA_SUCCESS,
    GET_STORAGEMEDIA_FAIL,
    CREATE_STORAGEMEDIA_START,
    CREATE_STORAGEMEDIA_SUCCESS,
    CREATE_STORAGEMEDIA_FAIL,
    EDIT_STORAGEMEDIA
} from '../types/storagemediaTypes';
import { updateObject } from "../utility";

const initialState = {
    storagemedias: [],
    storagemedia: {},
    loading: false,
    error: null,
}

const getStorageMediaListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getStorageMediaListSuccess = (state, action) => {
  return updateObject(state, {
    storagemedias: action.storagemedias,
    error: null,
    loading: false
  });
};

const getStorageMediaListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createStorageMediaStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createStorageMediaSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createStorageMediaFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getStorageMediaDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getStorageMediaDetailSuccess = (state, action) => {
  return updateObject(state, {
    storagemedia: action.storagemedia,
    error: null,
    loading: false
  });
};

const getStorageMediaDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function storagemedias(state = initialState, action){
    switch(action.type){
        case GET_STORAGEMEDIAS_START:
            return getStorageMediaListStart(state, action);
        case GET_STORAGEMEDIAS_SUCCESS:
            return getStorageMediaListSuccess(state, action);
        case GET_STORAGEMEDIAS_FAIL:
            return getStorageMediaListFail(state, action);
        case GET_STORAGEMEDIA_START:
            return getStorageMediaDetailStart(state, action);
        case GET_STORAGEMEDIA_SUCCESS:
            return getStorageMediaDetailSuccess(state, action);
        case GET_STORAGEMEDIA_FAIL:
            return getStorageMediaDetailFail(state, action);
        case CREATE_STORAGEMEDIA_START:
            return createStorageMediaStart(state, action);
        case CREATE_STORAGEMEDIA_SUCCESS:
            return createStorageMediaSuccess(state, action);
        case CREATE_STORAGEMEDIA_FAIL:
            return createStorageMediaFail(state, action);
        case EDIT_STORAGEMEDIA:
            const arrayList = state.storagemedias;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                storagemedias: arrayList,
            };
        default:
            return state;
    }
}
