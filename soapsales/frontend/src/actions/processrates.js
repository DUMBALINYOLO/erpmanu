import axios from 'axios';
import { 
    GET_PROCESS_RATES_START,
    GET_PROCESS_RATES_SUCCESS,
    GET_PROCESS_RATES_FAIL,
    CREATE_PROCESS_RATE_START,
    CREATE_PROCESS_RATE_SUCCESS,
    CREATE_PROCESS_RATE_FAIL,
    GET_PROCESS_RATE_START,
    GET_PROCESS_RATE_SUCCESS,
    GET_PROCESS_RATE_FAIL,
    EDIT_PROCESS_RATE 
} from '../types/processrateTypes';
import { processratesURL } from '../constants';

//process rates
const getProcessRateListStart = () => {
  return {
    type: GET_PROCESS_RATES_START
  };
};

const getProcessRateListSuccess = processrates => {
  return {
    type: GET_PROCESS_RATES_SUCCESS,
    processrates
  };
};

const getProcessRateListFail = error => {
  return {
    type: GET_PROCESS_RATES_FAIL,
    error: error
  };
};

const createProcessRateStart = () => {
  return {
    type: CREATE_PROCESS_RATE_START
  };
};


const createProcessRateSuccess = processrate => {
  return {
    type: CREATE_PROCESS_RATE_SUCCESS,
    processrate
  };
};

const createProcessRateFail = error => {
  return {
    type: CREATE_PROCESS_RATE_FAIL,
    error: error
  };
};

const getProcessRateDetailStart = () => {
  return {
    type: GET_PROCESS_RATE_START
  };
};

const getProcessRateDetailSuccess = processrate => {
  return {
    type: GET_PROCESS_RATE_SUCCESS,
    processrate
  };
};

const getProcessRateDetailFail = error => {
  return {
    type: GET_PROCESS_RATE_FAIL,
    error: error
  };
};

export const getProcessRates = (token) => {
  return dispatch => {
      dispatch(getProcessRateListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(processratesURL, headers)
        .then(res => {
          const processrates = res.data;
          dispatch(getProcessRateListSuccess(processrates));
          })
        .catch(err => {
          dispatch(getProcessRateListStart(err));
        });
    };
};

export const getProcessRate = (id, token) => {
  return dispatch => {
      dispatch(getProcessRateDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${processratesURL}${id}`, headers)
        .then(res => {
          const processrate = res.data;
          dispatch(getProcessRateDetailSuccess(processrate));
          })
        .catch(err => {
          dispatch(getProcessRateDetailFail(err));
        });
    };
};

export const addProcessRate = (processrate, token) => {
  return dispatch => {
      dispatch(createProcessRateStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(processratesURL, processrate, headers)
        .then(res => {
          dispatch(createProcessRateSuccess(processrate));
        })
        .catch(err => {
          dispatch(createProcessRateFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editProcessRate = (id, processrate, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${processratesURL}${id}/`, processrate, headers)
    .then(res => {
        dispatch({
            type: EDIT_PROCESS_RATE,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
