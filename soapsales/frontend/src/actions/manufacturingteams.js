import axios from 'axios';
import { 
    GET_MANUFACTURING_TEAMS_START,
    GET_MANUFACTURING_TEAMS_SUCCESS,
    GET_MANUFACTURING_TEAMS_FAIL,
    CREATE_MANUFACTURING_TEAM_START,
    CREATE_MANUFACTURING_TEAM_SUCCESS,
    CREATE_MANUFACTURING_TEAM_FAIL,
    GET_MANUFACTURING_TEAM_START,
    GET_MANUFACTURING_TEAM_SUCCESS,
    GET_MANUFACTURING_TEAM_FAIL,
    EDIT_MANUFACTURING_TEAM 
} from '../types/manufacturingteamTypes';
import { manufacturingteamsURL } from '../constants';

//manufacturing teams
const getManufacturingTeamListStart = () => {
  return {
    type: GET_MANUFACTURING_TEAMS_START
  };
};

const getManufacturingTeamListSuccess = manufacturingteams => {
  return {
    type: GET_MANUFACTURING_TEAMS_SUCCESS,
    manufacturingteams
  };
};

const getManufacturingTeamListFail = error => {
  return {
    type: GET_MANUFACTURING_TEAMS_FAIL,
    error: error
  };
};

const createManufacturingTeamStart = () => {
  return {
    type: CREATE_MANUFACTURING_TEAM_START
  };
};

const createManufacturingTeamSuccess = manufacturingteam => {
  return {
    type: CREATE_MANUFACTURING_TEAM_SUCCESS,
    manufacturingteam
  };
};

const createManufacturingTeamFail = error => {
  return {
    type: CREATE_MANUFACTURING_TEAM_FAIL,
    error: error
  };
};

const getManufacturingTeamDetailStart = () => {
  return {
    type: GET_MANUFACTURING_TEAM_START
  };
};

const getManufacturingTeamDetailSuccess = manufacturingteam => {
  return {
    type: GET_MANUFACTURING_TEAM_SUCCESS,
    manufacturingteam
  };
};

const getManufacturingTeamDetailFail = error => {
  return {
    type: GET_MANUFACTURING_TEAM_FAIL,
    error: error
  };
};

export const getManufacturingTeams = (token) => {
  return dispatch => {
      dispatch(getManufacturingTeamListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(manufacturingteamsURL, headers)
        .then(res => {
          const manufacturingteams = res.data;
          dispatch(getManufacturingTeamListSuccess(manufacturingteams));
          })
        .catch(err => {
          dispatch(getManufacturingTeamListStart(err));
        });
    };
};

export const getManufacturingTeam = (id, token) => {
  return dispatch => {
      dispatch(getManufacturingTeamDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${manufacturingteamsURL}${id}`, headers)
        .then(res => {
          const manufacturingteam = res.data;
          dispatch(getManufacturingTeamDetailSuccess(manufacturingteam));
          })
        .catch(err => {
          dispatch(getManufacturingTeamDetailFail(err));
        });
    };
};

export const addManufacturingTeam = (manufacturingteam, token) => {
  return dispatch => {
      dispatch(createManufacturingTeamStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(manufacturingteamsURL, manufacturingteam, headers)
        .then(res => {
          dispatch(createManufacturingTeamSuccess(manufacturingteam));
        })
        .catch(err => {
          dispatch(createManufacturingTeamFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editManufacturingTeam = (id, manufacturingteam, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${manufacturingteamsURL}${id}/`, manufacturingteam, headers)
    .then(res => {
        dispatch({
            type: EDIT_MANUFACTURING_TEAM,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
