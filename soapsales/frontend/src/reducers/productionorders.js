import { 
    GET_PRODUCTION_ORDERS_START,
    GET_PRODUCTION_ORDERS_SUCCESS,
    GET_PRODUCTION_ORDERS_FAIL,
    GET_PRODUCTION_ORDER_START,
    GET_PRODUCTION_ORDER_SUCCESS,
    GET_PRODUCTION_ORDER_FAIL,
    CREATE_PRODUCTION_ORDER_START,
    CREATE_PRODUCTION_ORDER_SUCCESS,
    CREATE_PRODUCTION_ORDER_FAIL,
    EDIT_PRODUCTION_ORDER
} from "../types/productionorderTypes";
import { updateObject } from "../utility";

const initialState = {
    productionorders: [],
    productionorder: {},
    loading: false,
    error: null,
}

const getProductionOrderListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProductionOrderListSuccess = (state, action) => {
  return updateObject(state, {
    productionorders: action.productionorders,
    error: null,
    loading: false
  });
};

const getProductionOrderListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createProductionOrderStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createProductionOrderSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createProductionOrderFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProductionOrderDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProductionOrderDetailSuccess = (state, action) => {
  return updateObject(state, {
    productionorder: action.productionorder,
    error: null,
    loading: false
  });
};

const getProductionOrderDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function productionorders(state = initialState, action){
    switch(action.type){
        case GET_PRODUCTION_ORDERS_START:
            return getProductionOrderListStart(state, action);
        case GET_PRODUCTION_ORDERS_SUCCESS:
            return getProductionOrderListSuccess(state, action);
        case GET_PRODUCTION_ORDERS_FAIL:
            return getProductionOrderListFail(state, action);
        case GET_PRODUCTION_ORDER_START:
            return getProductionOrderDetailStart(state, action);
        case GET_PRODUCTION_ORDER_SUCCESS:
            return getProductionOrderDetailSuccess(state, action);
        case GET_PRODUCTION_ORDER_FAIL:
            return getProductionOrderDetailFail(state, action);
        case CREATE_PRODUCTION_ORDER_START:
            return createProductionOrderStart(state, action);
        case CREATE_PRODUCTION_ORDER_SUCCESS:
            return createProductionOrderSuccess(state, action);
        case CREATE_PRODUCTION_ORDER_FAIL:
            return createProductionOrderFail(state, action);
        case EDIT_PRODUCTION_ORDER:
            const arrayList = state.productionorders;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                productionorders: arrayList,
            };
        default:
            return state;
    }
}
