import axios from 'axios';
import { 
    GET_MANUFACTURING_PERSONELS_START,
    GET_MANUFACTURING_PERSONELS_SUCCESS,
    GET_MANUFACTURING_PERSONELS_FAIL,
    CREATE_MANUFACTURING_PERSONEL_START,
    CREATE_MANUFACTURING_PERSONEL_SUCCESS,
    CREATE_MANUFACTURING_PERSONEL_FAIL,
    GET_MANUFACTURING_PERSONEL_START,
    GET_MANUFACTURING_PERSONEL_SUCCESS,
    GET_MANUFACTURING_PERSONEL_FAIL,
    EDIT_MANUFACTURING_PERSONEL 
} from '../types/manufacturingpersonelTypes';
import { manufacturingpersonelsURL } from '../constants';

//manufacturing personels
const getManufacturingPersonelListStart = () => {
  return {
    type: GET_MANUFACTURING_PERSONELS_START
  };
};

const getManufacturingPersonelListSuccess = manufacturingpersonels => {
  return {
    type: GET_MANUFACTURING_PERSONELS_SUCCESS,
    manufacturingpersonels
  };
};

const getManufacturingPersonelListFail = error => {
  return {
    type: GET_MANUFACTURING_PERSONELS_FAIL,
    error: error
  };
};

const createManufacturingPersonelStart = () => {
  return {
    type: CREATE_MANUFACTURING_PERSONEL_START
  };
};

const createManufacturingPersonelSuccess = manufacturingpersonel => {
  return {
    type: CREATE_MANUFACTURING_PERSONEL_SUCCESS,
    manufacturingpersonel
  };
};

const createManufacturingPersonelFail = error => {
  return {
    type: CREATE_MANUFACTURING_PERSONEL_FAIL,
    error: error
  };
};

const getManufacturingPersonelDetailStart = () => {
  return {
    type: GET_MANUFACTURING_PERSONEL_START
  };
};

const getManufacturingPersonelDetailSuccess = manufacturingpersonel => {
  return {
    type: GET_MANUFACTURING_PERSONEL_SUCCESS,
    manufacturingpersonel
  };
};

const getManufacturingPersonelDetailFail = error => {
  return {
    type: GET_MANUFACTURING_PERSONEL_FAIL,
    error: error
  };
};

export const getManufacturingPersonels = (token) => {
  return dispatch => {
      dispatch(getManufacturingPersonelListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(manufacturingpersonelsURL, headers)
        .then(res => {
          const manufacturingpersonels = res.data;
          dispatch(getManufacturingPersonelListSuccess(manufacturingpersonels));
          })
        .catch(err => {
          dispatch(getManufacturingPersonelListStart(err));
        });
    };
};

export const getManufacturingPersonel = (id, token) => {
  return dispatch => {
      dispatch(getManufacturingPersonelDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${manufacturingpersonelsURL}${id}`, headers)
        .then(res => {
          const manufacturingpersonel = res.data;
          dispatch(getManufacturingPersonelDetailSuccess(manufacturingpersonel));
          })
        .catch(err => {
          dispatch(getManufacturingPersonelDetailFail(err));
        });
    };
};

export const addManufacturingPersonel = (manufacturingpersonel, token) => {
  return dispatch => {
      dispatch(createManufacturingPersonelStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(manufacturingpersonelsURL, manufacturingpersonel, headers)
        .then(res => {
          dispatch(createManufacturingPersonelSuccess(manufacturingpersonel));
        })
        .catch(err => {
          dispatch(createManufacturingPersonelFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editManufacturingPersonel = (id, manufacturingpersonel, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${manufacturingpersonelsURL}${id}/`, manufacturingpersonel, headers)
    .then(res => {
        dispatch({
            type: EDIT_MANUFACTURING_PERSONEL,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
