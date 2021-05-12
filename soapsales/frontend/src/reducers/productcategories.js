import {
    GET_PRODUCT_CATEGORIES_START,
    GET_PRODUCT_CATEGORIES_SUCCESS,
    GET_PRODUCT_CATEGORIES_FAIL,
    GET_PRODUCT_CATEGORY_START,
    GET_PRODUCT_CATEGORY_SUCCESS,
    GET_PRODUCT_CATEGORY_FAIL,
    CREATE_PRODUCT_CATEGORY_START,
    CREATE_PRODUCT_CATEGORY_SUCCESS,
    CREATE_PRODUCT_CATEGORY_FAIL,
    EDIT_PRODUCT_CATEGORY
    } from '../types/productTypes';
import { updateObject } from "../utility";

const initialState = {
    productcategories: [],
    productcategory: {},
    loading: false,
    error: null,
}

const getProductCategoryListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProductCategoryListSuccess = (state, action) => {
  return updateObject(state, {
    productcategories: action.productcategories,
    error: null,
    loading: false
  });
};

const getProductCategoryListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createProductCategoryStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createProductCategorySuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createProductCategoryFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProductCategoryDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProductCategoryDetailSuccess = (state, action) => {
  return updateObject(state, {
    productcategory: action.productcategory,
    error: null,
    loading: false
  });
};

const getProductCategoryDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function productcategories(state = initialState, action){
    switch(action.type){
        case GET_PRODUCT_CATEGORIES_START:
            return getProductCategoryListStart(state, action);
        case GET_PRODUCT_CATEGORIES_SUCCESS:
            return getProductCategoryListSuccess(state, action);
        case GET_PRODUCT_CATEGORIES_FAIL:
            return getProductCategoryListFail(state, action);
        case GET_PRODUCT_CATEGORY_START:
            return getProductCategoryDetailStart(state, action);
        case GET_PRODUCT_CATEGORY_SUCCESS:
            return getProductCategoryDetailSuccess(state, action);
        case GET_PRODUCT_CATEGORY_FAIL:
            return getProductCategoryDetailFail(state, action);
        case CREATE_PRODUCT_CATEGORY_START:
            return createProductCategoryStart(state, action);
        case CREATE_PRODUCT_CATEGORY_SUCCESS:
            return createProductCategorySuccess(state, action);
        case CREATE_PRODUCT_CATEGORY_FAIL:
            return createProductCategoryFail(state, action);
        case EDIT_PRODUCT_CATEGORY:
            const arrayList = state.productcategories;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                productcategories: arrayList,
            };
        default:
            return state;
    }
}
