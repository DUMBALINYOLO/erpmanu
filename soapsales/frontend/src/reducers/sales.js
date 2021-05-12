import {
    GET_SALES_START,
    GET_SALES_SUCCESS,
    GET_SALES_FAIL,
    GET_SALE_START,
    GET_SALE_SUCCESS,
    GET_SALE_FAIL,
    CREATE_SALE_START,
    CREATE_SALE_SUCCESS,
    CREATE_SALE_FAIL,
    EDIT_SALE
} from '../types/saleTypes';
import { updateObject } from "../utility";

const initialState = {
    sales: [],
    sale: {},
    loading: false,
    error: null,
}

const getSaleListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getSaleListSuccess = (state, action) => {
  return updateObject(state, {
    sales: action.sales,
    error: null,
    loading: false
  });
};

const getSaleListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createSaleStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createSaleSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createSaleFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getSaleDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getSaleDetailSuccess = (state, action) => {
  return updateObject(state, {
    sale: action.sale,
    error: null,
    loading: false
  });
};

const getSaleDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function sales(state = initialState, action){
    switch(action.type){
        case GET_SALES_START:
            return getSaleListStart(state, action);
        case GET_SALES_SUCCESS:
            return getSaleListSuccess(state, action);
        case GET_SALES_FAIL:
            return getSaleListFail(state, action);
        case GET_SALE_START:
            return getSaleDetailStart(state, action);
        case GET_SALE_SUCCESS:
            return getSaleDetailSuccess(state, action);
        case GET_SALE_FAIL:
            return getSaleDetailFail(state, action);
        case CREATE_SALE_START:
            return createSaleStart(state, action);
        case CREATE_SALE_SUCCESS:
            return createSaleSuccess(state, action);
        case CREATE_SALE_FAIL:
            return createSaleFail(state, action);
        case EDIT_SALE:
            const arrayList = state.sales;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                sales: arrayList,
            };
        default:
            return state;
    }
}
