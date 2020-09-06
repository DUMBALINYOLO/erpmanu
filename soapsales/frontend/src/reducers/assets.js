import {
        ADD_ASSET,
        GET_ASSETS,
        DELETE_ASSET,
        GET_ASSET,
        EDIT_ASSET
    } from '../types/assetTypes';

const initialState = {
    assets: [],
    asset: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ASSETS:
            return {
                ...state,
                assets: action.payload
            };
        case DELETE_ASSET:
            return {
                ...state,
                asset: state.assets.filter(asset=> asset.id !== action.payload)
            };
        case ADD_ASSET:
            return {
                ...state,
                asset: [...state.assets, action.payload]
            }
        case GET_ASSET:
            return {
                ...state,
                asset:action.payload
                };
        case EDIT_ASSET:
            const arrayList = state.assets;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                assets: arrayList,
            };
        default:
            return state;
    }
}
