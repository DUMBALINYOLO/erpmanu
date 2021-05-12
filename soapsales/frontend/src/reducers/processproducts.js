import { 
    GET_PROCESS_PRODUCTS_START,
    GET_PROCESS_PRODUCTS_SUCCESS,
    GET_PROCESS_PRODUCTS_FAIL,
    GET_PROCESS_PRODUCT_START,
    GET_PROCESS_PRODUCT_SUCCESS,
    GET_PROCESS_PRODUCT_FAIL,
    CREATE_PROCESS_PRODUCT_START,
    CREATE_PROCESS_PRODUCT_SUCCESS,
    CREATE_PROCESS_PRODUCT_FAIL,
    EDIT_PROCESS_PRODUCT
} from "../types/processproductTypes";
import { updateObject } from "../utility";

const initialState = {
    processproducts: [],
    processproduct: {},
    loading: false,
    error: null,
}

const getProcessProductListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProcessProductListSuccess = (state, action) => {
  return updateObject(state, {
    processproducts: action.processproducts,
    error: null,
    loading: false
  });
};

const getProcessProductListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createProcessProductStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createProcessProductSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createProcessProductFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProcessProductDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProcessProductDetailSuccess = (state, action) => {
  return updateObject(state, {
    processproduct: action.processproduct,
    error: null,
    loading: false
  });
};

const getProcessProductDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function processproducts(state = initialState, action){
    switch(action.type){
        case GET_PROCESS_PRODUCTS_START:
            return getProcessProductListStart(state, action);
        case GET_PROCESS_PRODUCTS_SUCCESS:
            return getProcessProductListSuccess(state, action);
        case GET_PROCESS_PRODUCTS_FAIL:
            return getProcessProductListFail(state, action);
        case GET_PROCESS_PRODUCT_START:
            return getProcessProductDetailStart(state, action);
        case GET_PROCESS_PRODUCT_SUCCESS:
            return getProcessProductDetailSuccess(state, action);
        case GET_PROCESS_PRODUCT_FAIL:
            return getProcessProductDetailFail(state, action);
        case CREATE_PROCESS_PRODUCT_START:
            return createProcessProductStart(state, action);
        case CREATE_PROCESS_PRODUCT_SUCCESS:
            return createProcessProductSuccess(state, action);
        case CREATE_PROCESS_PRODUCT_FAIL:
            return createProcessProductFail(state, action);
        case EDIT_PROCESS_PRODUCT:
            const arrayList = state.processproducts;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                processproducts: arrayList,
            };
        default:
            return state;
    }
}
