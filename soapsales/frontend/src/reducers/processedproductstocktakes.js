import { 
    GET_PROCESSED_PRODUCT_STOCK_TAKES_START,
    GET_PROCESSED_PRODUCT_STOCK_TAKES_SUCCESS,
    GET_PROCESSED_PRODUCT_STOCK_TAKES_FAIL,
    GET_PROCESSED_PRODUCT_STOCK_TAKE_START,
    GET_PROCESSED_PRODUCT_STOCK_TAKE_SUCCESS,
    GET_PROCESSED_PRODUCT_STOCK_TAKE_FAIL,
    CREATE_PROCESSED_PRODUCT_STOCK_TAKE_START,
    CREATE_PROCESSED_PRODUCT_STOCK_TAKE_SUCCESS,
    CREATE_PROCESSED_PRODUCT_STOCK_TAKE_FAIL,
    EDIT_PROCESSED_PRODUCT_STOCK_TAKE
} from '../types/processedproductstocktakeTypes';
import { updateObject } from "../utility";

const initialState = {
    processedproductstocktakes: [],
    processedproductstocktake: {},
    loading: false,
    error: null,
}

const getProcessedProductStockTakeListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProcessedProductStockTakeListSuccess = (state, action) => {
  return updateObject(state, {
    processedproductstocktakes: action.processedproductstocktakes,
    error: null,
    loading: false
  });
};

const getProcessedProductStockTakeListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createProcessedProductStockTakeStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createProcessedProductStockTakeSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createProcessedProductStockTakeFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProcessedProductStockTakeDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProcessedProductStockTakeDetailSuccess = (state, action) => {
  return updateObject(state, {
    processedproductstocktake: action.processedproductstocktake,
    error: null,
    loading: false
  });
};

const getProcessedProductStockTakeDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function processedproductstocktakes(state = initialState, action){
    switch(action.type){
        case GET_PROCESSED_PRODUCT_STOCK_TAKES_START:
            return getProcessedProductStockTakeListStart(state, action);
        case GET_PROCESSED_PRODUCT_STOCK_TAKES_SUCCESS:
            return getProcessedProductStockTakeListSuccess(state, action);
        case GET_PROCESSED_PRODUCT_STOCK_TAKES_FAIL:
            return getProcessedProductStockTakeListFail(state, action);
        case GET_PROCESSED_PRODUCT_STOCK_TAKE_START:
            return getProcessedProductStockTakeDetailStart(state, action);
        case GET_PROCESSED_PRODUCT_STOCK_TAKE_SUCCESS:
            return getProcessedProductStockTakeDetailSuccess(state, action);
        case GET_PROCESSED_PRODUCT_STOCK_TAKE_FAIL:
            return getProcessedProductStockTakeDetailFail(state, action);
        case CREATE_PROCESSED_PRODUCT_STOCK_TAKE_START:
            return createProcessedProductStockTakeStart(state, action);
        case CREATE_PROCESSED_PRODUCT_STOCK_TAKE_SUCCESS:
            return createProcessedProductStockTakeSuccess(state, action);
        case CREATE_PROCESSED_PRODUCT_STOCK_TAKE_FAIL:
            return createProcessedProductStockTakeFail(state, action);
        case EDIT_PROCESSED_PRODUCT_STOCK_TAKE:
            const arrayList = state.processedproductstocktakes;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                processedproductstocktakes: arrayList,
            };
        default:
            return state;
    }
}
