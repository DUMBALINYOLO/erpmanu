import axios from 'axios';
import { ADD_MANUFACTURING_TEAM, GET_MANUFACTURING_TEAMS, GET_MANUFACTURING_TEAM, DELETE_MANUFACTURING_TEAM } from '../types/manufacturingteamTypes';
import { manufacturingteamsURL } from '../constants';

// Get
export const getManufacturingTeams=  () => dispatch => {
    axios.get(manufacturingteamsURL)
        .then(res => {
            dispatch({
                type:  GET_MANUFACTURING_TEAMS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

//Delete

export const deleteManufacturingTeam = (id) => dispatch => {
    axios.delete(manufacturingteamsURL, id)
        .then(res => {
            dispatch({
                type: DELETE_MANUFACTURING_TEAM,
                payload: id
            });
        }).catch(err => console.log(err))
}

// Add
export const addManufacturingTeam = manufacturingteam => dispatch => {
    axios.post(manufacturingteamsURL, manufacturingteam)
        .then(res => {
            dispatch({
                type: ADD_MANUFACTURING_TEAM,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getManufacturingTeam = id => dispatch =>{
      axios.get(`http://127.0.0.1:8000/api/manufacture/manufacturing-teams/${id}`)
        .then(res => {
            dispatch({
                type: GET_MANUFACTURING_TEAM,
                payload: res.data
            });
        }).catch(err => console.log(err))

}
