import { 
    GET_MANUFACTURING_TEAMS_START,
    GET_MANUFACTURING_TEAMS_SUCCESS,
    GET_MANUFACTURING_TEAMS_FAIL,
    GET_MANUFACTURING_TEAM_START,
    GET_MANUFACTURING_TEAM_SUCCESS,
    GET_MANUFACTURING_TEAM_FAIL,
    CREATE_MANUFACTURING_TEAM_START,
    CREATE_MANUFACTURING_TEAM_SUCCESS,
    CREATE_MANUFACTURING_TEAM_FAIL,
    EDIT_MANUFACTURING_TEAM
} from '../types/manufacturingteamTypes';
import { updateObject } from "../utility";

const initialState = {
    manufacturingteams: [],
    manufacturingteam: {},
    loading: false,
    error: null,
}

const getManufacturingTeamListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getManufacturingTeamListSuccess = (state, action) => {
  return updateObject(state, {
    manufacturingteams: action.manufacturingteams,
    error: null,
    loading: false
  });
};

const getManufacturingTeamListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createManufacturingTeamStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createManufacturingTeamSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createManufacturingTeamFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getManufacturingTeamDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getManufacturingTeamDetailSuccess = (state, action) => {
  return updateObject(state, {
    manufacturingteam: action.manufacturingteam,
    error: null,
    loading: false
  });
};

const getManufacturingTeamDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function manufacturingteams(state = initialState, action){
    switch(action.type){
        case GET_MANUFACTURING_TEAMS_START:
            return getManufacturingTeamListStart(state, action);
        case GET_MANUFACTURING_TEAMS_SUCCESS:
            return getManufacturingTeamListSuccess(state, action);
        case GET_MANUFACTURING_TEAMS_FAIL:
            return getManufacturingTeamListFail(state, action);
        case GET_MANUFACTURING_TEAM_START:
            return getManufacturingTeamDetailStart(state, action);
        case GET_MANUFACTURING_TEAM_SUCCESS:
            return getManufacturingTeamDetailSuccess(state, action);
        case GET_MANUFACTURING_TEAM_FAIL:
            return getManufacturingTeamDetailFail(state, action);
        case CREATE_MANUFACTURING_TEAM_START:
            return createManufacturingTeamStart(state, action);
        case CREATE_MANUFACTURING_TEAM_SUCCESS:
            return createManufacturingTeamSuccess(state, action);
        case CREATE_MANUFACTURING_TEAM_FAIL:
            return createManufacturingTeamFail(state, action);
        case EDIT_MANUFACTURING_TEAM:
            const arrayList = state.manufacturingteams;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                manufacturingteams: arrayList,
            };
        default:
            return state;
    }
}
