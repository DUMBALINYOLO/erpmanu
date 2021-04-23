import {
        ADD_PRODUCT_CATEGORY,
        GET_PRODUCT_CATEGORIES,
        EDIT_PRODUCT_CATEGORY,
        DELETE_PRODUCT_CATEGORY
    } from '../types/productTypes';

const initialState = {
    productcategories: [],
    productcategory: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_PRODUCT_CATEGORIES:
            return {
                ...state,
                productcategories: action.payload
            };
        case DELETE_PRODUCT_CATEGORY:
            return {
                ...state,
                productcategory: state.productcategories.filter(productcategory=> productcategory.id !== action.payload)
            };
        case ADD_PRODUCT_CATEGORY:
            return {
                ...state,
                productcategory: [...state.productcategories, action.payload]
            };
        case EDIT_PRODUCT_CATEGORY:
            const arrayList = state.products;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                productcategories: arrayList,
            };
        default:
            return state;
    }
}
