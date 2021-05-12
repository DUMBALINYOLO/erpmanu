import {
    GET_INVENTORY_ORDERPAYMENTS_START,
    GET_INVENTORY_ORDERPAYMENTS_SUCCESS,
    GET_INVENTORY_ORDERPAYMENTS_FAIL,
    CREATE_INVENTORY_ORDERPAYMENT_START,
    CREATE_INVENTORY_ORDERPAYMENT_SUCCESS,
    CREATE_INVENTORY_ORDERPAYMENT_FAIL,
    GET_INVENTORY_ORDERPAYMENT_START,
    GET_INVENTORY_ORDERPAYMENT_SUCCESS,
    GET_INVENTORY_ORDERPAYMENT_FAIL,
    EDIT_INVENTORY_ORDERPAYMENT
} from '../types/inventoryorderpaymentTypes';
import { updateObject } from "../utility";

const initialState = {
    inventoryorderpayments: [],
    inventoryorderpayment: {},
    loading: false,
    error: null,
}

const getInventoryOrderPaymentListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInventoryOrderPaymentListSuccess = (state, action) => {
  return updateObject(state, {
    inventoryorderpayments: action.inventoryorderpayments,
    error: null,
    loading: false
  });
};

const getInventoryOrderPaymentListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createInventoryOrderPaymentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createInventoryOrderPaymentSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createInventoryOrderPaymentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getInventoryOrderPaymentDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInventoryOrderPaymentDetailSuccess = (state, action) => {
  return updateObject(state, {
    inventoryorderpayment: action.inventoryorderpayment,
    error: null,
    loading: false
  });
};

const getInventoryOrderPaymentDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function inventoryorderpayments(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY_ORDERPAYMENTS_START:
            return getInventoryOrderPaymentListStart(state, action);
        case GET_INVENTORY_ORDERPAYMENTS_SUCCESS:
            return getInventoryOrderPaymentListSuccess(state, action);
        case GET_INVENTORY_ORDERPAYMENTS_FAIL:
            return getInventoryOrderPaymentListFail(state, action);
        case CREATE_INVENTORY_ORDERPAYMENT_START:
            return createInventoryOrderPaymentStart(state, action);
        case CREATE_INVENTORY_ORDERPAYMENT_SUCCESS:
            return createInventoryOrderPaymentSuccess(state, action);
        case CREATE_INVENTORY_ORDERPAYMENT_FAIL:
            return createInventoryOrderPaymentFail(state, action);
        case GET_INVENTORY_ORDERPAYMENT_START:
        return getInventoryOrderPaymentDetailStart(state, action);
        case GET_INVENTORY_ORDERPAYMENT_SUCCESS:
            return getInventoryOrderPaymentDetailSuccess(state, action);
        case GET_INVENTORY_ORDERPAYMENT_FAIL:
            return getInventoryOrderPaymentDetailFail(state, action);
        case EDIT_INVENTORY_ORDERPAYMENT:
            const arrayList = state.inventoryorderpayments;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                inventoryorderpayments: arrayList,
            };
        default:
            return state;
    }
}
