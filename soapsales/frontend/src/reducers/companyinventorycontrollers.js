import {
    GET_COMPANY_INVENTORY_CONTROLLERS_START,
    GET_COMPANY_INVENTORY_CONTROLLERS_SUCCESS,
    GET_COMPANY_INVENTORY_CONTROLLERS_FAIL,
    CREATE_COMPANY_INVENTORY_CONTROLLER_START,
    CREATE_COMPANY_INVENTORY_CONTROLLER_SUCCESS,
    CREATE_COMPANY_INVENTORY_CONTROLLER_FAIL,
    GET_COMPANY_INVENTORY_CONTROLLER_START,
    GET_COMPANY_INVENTORY_CONTROLLER_SUCCESS,
    GET_COMPANY_INVENTORY_CONTROLLER_FAIL,
    EDIT_COMPANY_INVENTORY_CONTROLLER
    } from '../types/companyinventorycontrollerTypes';
import { updateObject } from "../utility";

const initialState = {
    companyinventorycontrollers: [],
    companyinventorycontroller: {},
    loading: false,
    error: null,
}

const getCompanyInventoryControllerListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCompanyInventoryControllerListSuccess = (state, action) => {
  return updateObject(state, {
    companyinventorycontrollers: action.companyinventorycontrollers,
    error: null,
    loading: false
  });
};

const getCompanyInventoryControllerListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createCompanyInventoryControllerStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createCompanyInventoryControllerSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createCompanyInventoryControllerFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getCompanyInventoryControllerDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCompanyInventoryControllerDetailSuccess = (state, action) => {
  return updateObject(state, {
    companyinventorycontroller: action.companyinventorycontroller,
    error: null,
    loading: false
  });
};

const getCompanyInventoryControllerDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function companyinventorycontrollers(state = initialState, action){
    switch(action.type){
        case GET_COMPANY_INVENTORY_CONTROLLERS_START:
            return getCompanyInventoryControllerListStart(state, action);
        case GET_COMPANY_INVENTORY_CONTROLLERS_SUCCESS:
            return getCompanyInventoryControllerListSuccess(state, action);
        case GET_COMPANY_INVENTORY_CONTROLLERS_FAIL:
            return getCompanyInventoryControllerListFail(state, action);
        case CREATE_COMPANY_INVENTORY_CONTROLLER_START:
            return createCompanyInventoryControllerStart(state, action);
        case CREATE_COMPANY_INVENTORY_CONTROLLER_SUCCESS:
            return createCompanyInventoryControllerSuccess(state, action);
        case CREATE_COMPANY_INVENTORY_CONTROLLER_FAIL:
            return createCompanyInventoryControllerFail(state, action);
        case GET_COMPANY_INVENTORY_CONTROLLER_START:
        return getCompanyInventoryControllerDetailStart(state, action);
        case GET_COMPANY_INVENTORY_CONTROLLER_SUCCESS:
            return getCompanyInventoryControllerDetailSuccess(state, action);
        case GET_COMPANY_INVENTORY_CONTROLLER_FAIL:
            return getCompanyInventoryControllerDetailFail(state, action);
        case EDIT_COMPANY_INVENTORY_CONTROLLER:
            const arrayList = state.companyinventorycontrollers;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                companyinventorycontrollers: arrayList,
            };
        default:
            return state;
    }
}
