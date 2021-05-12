import { 
    GET_SALES_GROUPS_PRICING_DISCOUNTS_START,
    GET_SALES_GROUPS_PRICING_DISCOUNTS_SUCCESS,
    GET_SALES_GROUPS_PRICING_DISCOUNTS_FAIL,
    GET_SALES_GROUPS_PRICING_DISCOUNT_START,
    GET_SALES_GROUPS_PRICING_DISCOUNT_SUCCESS,
    GET_SALES_GROUPS_PRICING_DISCOUNT_FAIL,
    CREATE_SALES_GROUPS_PRICING_DISCOUNT_START,
    CREATE_SALES_GROUPS_PRICING_DISCOUNT_SUCCESS,
    CREATE_SALES_GROUPS_PRICING_DISCOUNT_FAIL,
    EDIT_SALES_GROUPS_PRICING_DISCOUNT
} from '../types/salesgroupspricingdiscountTypes';
import { updateObject } from "../utility";

const initialState = {
    salesgroupspricingdiscounts: [],
    salesgroupspricingdiscount: {},
    loading: false,
    error: null,
}

const getSalesGroupsPricingDiscountListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getSalesGroupsPricingDiscountListSuccess = (state, action) => {
  return updateObject(state, {
    salesgroupspricingdiscounts: action.salesgroupspricingdiscounts,
    error: null,
    loading: false
  });
};

const getSalesGroupsPricingDiscountListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createSalesGroupsPricingDiscountStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createSalesGroupsPricingDiscountSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createSalesGroupsPricingDiscountFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getSalesGroupsPricingDiscountDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getSalesGroupsPricingDiscountDetailSuccess = (state, action) => {
  return updateObject(state, {
    salesgroupspricingdiscount: action.salesgroupspricingdiscount,
    error: null,
    loading: false
  });
};

const getSalesGroupsPricingDiscountDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function salesgroupspricingdiscounts(state = initialState, action){
    switch(action.type){
        case GET_SALES_GROUPS_PRICING_DISCOUNTS_START:
            return getSalesGroupsPricingDiscountListStart(state, action);
        case GET_SALES_GROUPS_PRICING_DISCOUNTS_SUCCESS:
            return getSalesGroupsPricingDiscountListSuccess(state, action);
        case GET_SALES_GROUPS_PRICING_DISCOUNTS_FAIL:
            return getSalesGroupsPricingDiscountListFail(state, action);
        case GET_SALES_GROUPS_PRICING_DISCOUNT_START:
            return getSalesGroupsPricingDiscountDetailStart(state, action);
        case GET_SALES_GROUPS_PRICING_DISCOUNT_SUCCESS:
            return getSalesGroupsPricingDiscountDetailSuccess(state, action);
        case GET_SALES_GROUPS_PRICING_DISCOUNT_FAIL:
            return getSalesGroupsPricingDiscountDetailFail(state, action);
        case CREATE_SALES_GROUPS_PRICING_DISCOUNT_START:
            return createSalesGroupsPricingDiscountStart(state, action);
        case CREATE_SALES_GROUPS_PRICING_DISCOUNT_SUCCESS:
            return createSalesGroupsPricingDiscountSuccess(state, action);
        case CREATE_SALES_GROUPS_PRICING_DISCOUNT_FAIL:
            return createSalesGroupsPricingDiscountFail(state, action);
        case EDIT_SALES_GROUPS_PRICING_DISCOUNT:
            const arrayList = state.salesgroupspricingdiscounts;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                salesgroupspricingdiscounts: arrayList,
            };
        default:
            return state;
    }
}
