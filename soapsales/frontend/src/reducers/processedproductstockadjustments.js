import { 
    GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENTS_START,
    GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENTS_SUCCESS,
    GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENTS_FAIL,
    GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_START,
    GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_SUCCESS,
    GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_FAIL,
    CREATE_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_START,
    CREATE_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_SUCCESS,
    CREATE_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_FAIL,
    EDIT_PROCESSED_PRODUCT_STOCK_ADJUSTMENT
} from '../types/processedproductstockadjustmentTypes';
import { updateObject } from "../utility";

const initialState = {
    processedproductstockadjustments: [],
    processedproductstockadjustment: {},
    loading: false,
    error: null,
}

const getProcessedProductStockAdjustmentListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProcessedProductStockAdjustmentListSuccess = (state, action) => {
  return updateObject(state, {
    processedproductstockadjustments: action.processedproductstockadjustments,
    error: null,
    loading: false
  });
};

const getProcessedProductStockAdjustmentListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createProcessedProductStockAdjustmentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createProcessedProductStockAdjustmentSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createProcessedProductStockAdjustmentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProcessedProductStockAdjustmentDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProcessedProductStockAdjustmentDetailSuccess = (state, action) => {
  return updateObject(state, {
    processedproductstockadjustment: action.processedproductstockadjustment,
    error: null,
    loading: false
  });
};

const getProcessedProductStockAdjustmentDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function processedproductstockadjustments(state = initialState, action){
    switch(action.type){
        case GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENTS_START:
            return getProcessedProductStockAdjustmentListStart(state, action);
        case GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENTS_SUCCESS:
            return getProcessedProductStockAdjustmentListSuccess(state, action);
        case GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENTS_FAIL:
            return getProcessedProductStockAdjustmentListFail(state, action);
        case GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_START:
            return getProcessedProductStockAdjustmentDetailStart(state, action);
        case GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_SUCCESS:
            return getProcessedProductStockAdjustmentDetailSuccess(state, action);
        case GET_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_FAIL:
            return getProcessedProductStockAdjustmentDetailFail(state, action);
        case CREATE_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_START:
            return createProcessedProductStockAdjustmentStart(state, action);
        case CREATE_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_SUCCESS:
            return createProcessedProductStockAdjustmentSuccess(state, action);
        case CREATE_PROCESSED_PRODUCT_STOCK_ADJUSTMENT_FAIL:
            return createProcessedProductStockAdjustmentFail(state, action);
        case EDIT_PROCESSED_PRODUCT_STOCK_ADJUSTMENT:
            const arrayList = state.processedproductstockadjustments;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                processedproductstockadjustments: arrayList,
            };
        default:
            return state;
    }
}
