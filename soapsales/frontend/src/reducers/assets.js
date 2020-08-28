import {
        ADD_ASSET,
        GET_ASSETS,
        DELETE_ASSET,
        GET_ASSET
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
        default:
            return state;
    }
}
