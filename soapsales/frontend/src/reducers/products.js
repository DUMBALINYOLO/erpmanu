import {
    GET_PRODUCTS_START,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCT_START,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    CREATE_PRODUCT_START,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    EDIT_PRODUCT
    } from '../types/productTypes';
import { updateObject } from "../utility";

const initialState = {
    products: [],
    product: {},
    loading: false,
    error: null,
}

const getProductListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProductListSuccess = (state, action) => {
  return updateObject(state, {
    products: action.products,
    error: null,
    loading: false
  });
};

const getProductListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createProductStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createProductSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createProductFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProductDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProductDetailSuccess = (state, action) => {
  return updateObject(state, {
    product: action.product,
    error: null,
    loading: false
  });
};

const getProductDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function products(state = initialState, action){
    switch(action.type){
        case GET_PRODUCTS_START:
            return getProductListStart(state, action);
        case GET_PRODUCTS_SUCCESS:
            return getProductListSuccess(state, action);
        case GET_PRODUCTS_FAIL:
            return getProductListFail(state, action);
        case GET_PRODUCT_START:
            return getProductDetailStart(state, action);
        case GET_PRODUCT_SUCCESS:
            return getProductDetailSuccess(state, action);
        case GET_PRODUCT_FAIL:
            return getProductDetailFail(state, action);
        case CREATE_PRODUCT_START:
            return createProductStart(state, action);
        case CREATE_PRODUCT_SUCCESS:
            return createProductSuccess(state, action);
        case CREATE_PRODUCT_FAIL:
            return createProductFail(state, action);
        case EDIT_PRODUCT:
            const arrayList = state.products;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                products: arrayList,
            };
        default:
            return state;
    }
}
