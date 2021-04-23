import axios from 'axios';
import {
    GET_EQUIPMENTS_START,
    GET_EQUIPMENTS_SUCCESS,
    GET_EQUIPMENTS_FAIL,
    CREATE_EQUIPMENT_START,
    CREATE_EQUIPMENT_SUCCESS,
    CREATE_EQUIPMENT_FAIL,
    GET_EQUIPMENT_START,
    GET_EQUIPMENT_SUCCESS,
    GET_EQUIPMENT_FAIL,
    EDIT_EQUIPMENT
    } from '../types/equipmentTypes';
import { equipmentsURL } from '../constants';

//equipments
const getEquipmentListStart = () => {
  return {
    type: GET_EQUIPMENTS_START
  };
};

const getEquipmentListSuccess = equipments => {
  return {
    type: GET_EQUIPMENTS_SUCCESS,
    equipments
  };
};

const getEquipmentListFail = error => {
  return {
    type: GET_EQUIPMENTS_FAIL,
    error: error
  };
};

const createEquipmentStart = () => {
  return {
    type: CREATE_EQUIPMENT_START
  };
};

const createEquipmentSuccess = equipment => {
  return {
    type: CREATE_EQUIPMENT_SUCCESS,
    equipment
  };
};

const createEquipmentFail = error => {
  return {
    type: CREATE_EQUIPMENT_FAIL,
    error: error
  };
};

const getEquipmentDetailStart = () => {
  return {
    type: GET_EQUIPMENT_START
  };
};

const getEquipmentDetailSuccess = equipment => {
  return {
    type: GET_EQUIPMENT_SUCCESS,
    equipment
  };
};

const getEquipmentDetailFail = error => {
  return {
    type: GET_EQUIPMENT_FAIL,
    error: error
  };
};

export const getEquipments = (token) => {
  return dispatch => {
      dispatch(getEquipmentListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(equipmentsURL, headers)
        .then(res => {
          const equipments = res.data;
          dispatch(getEquipmentListSuccess(equipments));
          })
        .catch(err => {
          dispatch(getEquipmentListStart(err));
        });
    };
};

export const getEquipment = (id, token) => {
  return dispatch => {
      dispatch(getEquipmentDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${equipmentsURL}${id}`, headers)
        .then(res => {
          const equipment = res.data;
          dispatch(getEquipmentDetailSuccess(equipment));
          })
        .catch(err => {
          dispatch(getEquipmentDetailFail(err));
        });
    };
};

export const addEquipment = (equipment, token) => {
  return dispatch => {
      dispatch(createEquipmentStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(equipmentsURL, equipment, headers)
        .then(res => {
          dispatch(createEquipmentSuccess(equipment));
        })
        .catch(err => {
          dispatch(createEquipmentFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editEquipment = (id, equipment, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${equipmentsURL}${id}/`, equipment, headers)
    .then(res => {
        dispatch({
            type: EDIT_EQUIPMENT,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
