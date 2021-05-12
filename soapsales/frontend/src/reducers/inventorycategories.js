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
import { updateObject } from "../utility";

const initialState = {
    inventorycategories: [],
    inventorycategory: {},
    loading: false,
    error: null,
}

const InventoryCategoryListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInventoryCategoryListSuccess = (state, action) => {
  return updateObject(state, {
    inventorycategories: action.inventorycategories,
    error: null,
    loading: false
  });
};

const getInventoryCategoryListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createInventoryCategoryStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createInventoryCategorySuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createInventoryCategoryFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getInventoryCategoryDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInventoryCategoryDetailSuccess = (state, action) => {
  return updateObject(state, {
    inventorycategory: action.inventorycategory,
    error: null,
    loading: false
  });
};

const getInventoryCategoryDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function inventorycategories(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY_CATEGORIES_START:
            return getInventoryCategoryListStart(state, action);
        case GET_INVENTORY_CATEGORIES_SUCCESS:
            return getInventoryCategoryListSuccess(state, action);
        case GET_INVENTORY_CATEGORIES_FAIL:
            return getInventoryCategoryListFail(state, action);
        case CREATE_INVENTORY_CATEGORY_START:
            return createInventoryCategoryStart(state, action);
        case CREATE_INVENTORY_CATEGORY_SUCCESS:
            return createInventoryCategorySuccess(state, action);
        case CREATE_INVENTORY_CATEGORY_FAIL:
            return createInventoryCategoryFail(state, action);
        case GET_INVENTORY_CATEGORY_START:
        return getInventoryCategoryDetailStart(state, action);
        case GET_INVENTORY_CATEGORY_SUCCESS:
            return getInventoryCategoryDetailSuccess(state, action);
        case GET_INVENTORY_CATEGORY_FAIL:
            return getInventoryCategoryDetailFail(state, action);
        case EDIT_INVENTORY_CATEGORY:
            const arrayList = state.inventorycategories;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                inventorycategories: arrayList,
            };
        default:
            return state;
    }
}
