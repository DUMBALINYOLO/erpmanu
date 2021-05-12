import axios from 'axios';
import { 
    GET_SALES_GROUPS_PRICING_DISCOUNTS_START,
    GET_SALES_GROUPS_PRICING_DISCOUNTS_SUCCESS,
    GET_SALES_GROUPS_PRICING_DISCOUNTS_FAIL,
    CREATE_SALES_GROUPS_PRICING_DISCOUNT_START,
    CREATE_SALES_GROUPS_PRICING_DISCOUNT_SUCCESS,
    CREATE_SALES_GROUPS_PRICING_DISCOUNT_FAIL,
    GET_SALES_GROUPS_PRICING_DISCOUNT_START,
    GET_SALES_GROUPS_PRICING_DISCOUNT_SUCCESS,
    GET_SALES_GROUPS_PRICING_DISCOUNT_FAIL,
    EDIT_SALES_GROUPS_PRICING_DISCOUNT 
} from '../types/salesgroupspricingdiscountTypes';
import { salesgroupspricingdiscountsURL } from '../constants';

//sales groups pricing discounts
const getSalesGroupsPricingDiscountListStart = () => {
  return {
    type: GET_SALES_GROUPS_PRICING_DISCOUNTS_START
  };
};

const getSalesGroupsPricingDiscountListSuccess = salesgroupspricingdiscounts => {
  return {
    type: GET_SALES_GROUPS_PRICING_DISCOUNTS_SUCCESS,
    salesgroupspricingdiscounts
  };
};

const getSalesGroupsPricingDiscountListFail = error => {
  return {
    type: GET_SALES_GROUPS_PRICING_DISCOUNTS_FAIL,
    error: error
  };
};

const createSalesGroupsPricingDiscountStart = () => {
  return {
    type: CREATE_SALES_GROUPS_PRICING_DISCOUNT_START
  };
};


const createSalesGroupsPricingDiscountSuccess = salesgroupspricingdiscount => {
  return {
    type: CREATE_SALES_GROUPS_PRICING_DISCOUNT_SUCCESS,
    salesgroupspricingdiscount
  };
};

const createSalesGroupsPricingDiscountFail = error => {
  return {
    type: CREATE_SALES_GROUPS_PRICING_DISCOUNT_FAIL,
    error: error
  };
};

const getSalesGroupsPricingDiscountDetailStart = () => {
  return {
    type: GET_SALES_GROUPS_PRICING_DISCOUNT_START
  };
};

const getSalesGroupsPricingDiscountDetailSuccess = salesgroupspricingdiscount => {
  return {
    type: GET_SALES_GROUPS_PRICING_DISCOUNT_SUCCESS,
    salesgroupspricingdiscount
  };
};

const getSalesGroupsPricingDiscountDetailFail = error => {
  return {
    type: GET_SALES_GROUPS_PRICING_DISCOUNT_FAIL,
    error: error
  };
};

export const getSalesGroupsPricingDiscounts = (token) => {
  return dispatch => {
      dispatch(getSalesGroupsPricingDiscountListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(salesgroupspricingdiscountsURL, headers)
        .then(res => {
          const salesgroupspricingdiscounts = res.data;
          dispatch(getSalesGroupsPricingDiscountListSuccess(salesgroupspricingdiscounts));
          })
        .catch(err => {
          dispatch(getSalesGroupsPricingDiscountListStart(err));
        });
    };
};

export const getSalesGroupsPricingDiscount = (id, token) => {
  return dispatch => {
      dispatch(getSalesGroupsPricingDiscountDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${salesgroupspricingdiscountsURL}${id}`, headers)
        .then(res => {
          const salesgroupspricingdiscount = res.data;
          dispatch(getSalesGroupsPricingDiscountDetailSuccess(salesgroupspricingdiscount));
          })
        .catch(err => {
          dispatch(getSalesGroupsPricingDiscountDetailFail(err));
        });
    };
};

export const addSalesGroupsPricingDiscount = (salesgroupspricingdiscount, token) => {
  return dispatch => {
      dispatch(createSalesGroupsPricingDiscountStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(salesgroupspricingdiscountsURL, salesgroupspricingdiscount, headers)
        .then(res => {
          dispatch(createSalesGroupsPricingDiscountSuccess(salesgroupspricingdiscount));
        })
        .catch(err => {
          dispatch(createSalesGroupsPricingDiscountFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editSalesGroupsPricingDiscount = (id, salesgroupspricingdiscount, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${salesgroupspricingdiscountsURL}${id}/`, salesgroupspricingdiscount, headers)
    .then(res => {
        dispatch({
            type: EDIT_SALES_GROUPS_PRICING_DISCOUNT,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
