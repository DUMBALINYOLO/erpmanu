import { GET_STORAGEMEDIAS, GET_STORAGEMEDIA, EDIT_STORAGEMEDIA, DELETE_STORAGEMEDIA, ADD_STORAGEMEDIA  } from '../types/storagemediaTypes';

const initialState = {
    storagemedias: [],
    storagemedia: [],
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_STORAGEMEDIAS:
            return {
                ...state,
                storagemedias: action.payload
            };
        case DELETE_STORAGEMEDIA:
            return {
                ...state,
                storagemedia: state.storagemedias.filter(storagemedia => storagemedia.id !== action.payload)
            };
        case ADD_STORAGEMEDIA:
            return {
                ...state,
                storagemedia: [...state.storagemedias, action.payload]
            };
        case GET_STORAGEMEDIA:
            return {
                ...state,
                storagemedia: action.payload
            };
        case EDIT_STORAGEMEDIA:
            const arrayList = state.storagemedias;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                storagemedias: arrayList,
            };
        default:
            return state;
    }
}
