import { 
    GET_STOCK_ADJUSTMENTS_START,
    GET_STOCK_ADJUSTMENTS_SUCCESS,
    GET_STOCK_ADJUSTMENTS_FAIL,
    GET_STOCK_ADJUSTMENT_START,
    GET_STOCK_ADJUSTMENT_SUCCESS,
    GET_STOCK_ADJUSTMENT_FAIL,
    CREATE_STOCK_ADJUSTMENT_START,
    CREATE_STOCK_ADJUSTMENT_SUCCESS,
    CREATE_STOCK_ADJUSTMENT_FAIL,
    EDIT_STOCK_ADJUSTMENT
} from '../types/stockadjustmentTypes';
import { updateObject } from "../utility";

const initialState = {
    stockadjustments: [],
    stockadjustment: {},
    loading: false,
    error: null,
}

const getStockAdjustmentListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getStockAdjustmentListSuccess = (state, action) => {
  return updateObject(state, {
    stockadjustments: action.stockadjustments,
    error: null,
    loading: false
  });
};

const getStockAdjustmentListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createStockAdjustmentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createStockAdjustmentSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createStockAdjustmentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getStockAdjustmentDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getStockAdjustmentDetailSuccess = (state, action) => {
  return updateObject(state, {
    stockadjustment: action.stockadjustment,
    error: null,
    loading: false
  });
};

const getStockAdjustmentDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function stockadjustments(state = initialState, action){
    switch(action.type){
        case GET_STOCK_ADJUSTMENTS_START:
            return getStockAdjustmentListStart(state, action);
        case GET_STOCK_ADJUSTMENTS_SUCCESS:
            return getStockAdjustmentListSuccess(state, action);
        case GET_STOCK_ADJUSTMENTS_FAIL:
            return getStockAdjustmentListFail(state, action);
        case GET_STOCK_ADJUSTMENT_START:
            return getStockAdjustmentDetailStart(state, action);
        case GET_STOCK_ADJUSTMENT_SUCCESS:
            return getStockAdjustmentDetailSuccess(state, action);
        case GET_STOCK_ADJUSTMENT_FAIL:
            return getStockAdjustmentDetailFail(state, action);
        case CREATE_STOCK_ADJUSTMENT_START:
            return createStockAdjustmentStart(state, action);
        case CREATE_STOCK_ADJUSTMENT_SUCCESS:
            return createStockAdjustmentSuccess(state, action);
        case CREATE_STOCK_ADJUSTMENT_FAIL:
            return createStockAdjustmentFail(state, action);
        case EDIT_STOCK_ADJUSTMENT:
            const arrayList = state.stockadjustments;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                stockadjustments: arrayList,
            };
        default:
            return state;
    }
}
