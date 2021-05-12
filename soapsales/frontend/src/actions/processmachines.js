import axios from 'axios';
import { 
    GET_PROCESS_MACHINES_START,
    GET_PROCESS_MACHINES_SUCCESS,
    GET_PROCESS_MACHINES_FAIL,
    CREATE_PROCESS_MACHINE_START,
    CREATE_PROCESS_MACHINE_SUCCESS,
    CREATE_PROCESS_MACHINE_FAIL,
    GET_PROCESS_MACHINE_START,
    GET_PROCESS_MACHINE_SUCCESS,
    GET_PROCESS_MACHINE_FAIL,
    EDIT_PROCESS_MACHINE 
} from '../types/processmachineTypes';
import { processmachinesURL } from '../constants';

//process machines
const getProcessMachineListStart = () => {
  return {
    type: GET_PROCESS_MACHINES_START
  };
};

const getProcessMachineListSuccess = processmachines => {
  return {
    type: GET_PROCESS_MACHINES_SUCCESS,
    processmachines
  };
};

const getProcessMachineListFail = error => {
  return {
    type: GET_PROCESS_MACHINES_FAIL,
    error: error
  };
};

const createProcessMachineStart = () => {
  return {
    type: CREATE_PROCESS_MACHINE_START
  };
};


const createProcessMachineSuccess = processmachine => {
  return {
    type: CREATE_PROCESS_MACHINE_SUCCESS,
    processmachine
  };
};

const createProcessMachineFail = error => {
  return {
    type: CREATE_PROCESS_MACHINE_FAIL,
    error: error
  };
};

const getProcessMachineDetailStart = () => {
  return {
    type: GET_PROCESS_MACHINE_START
  };
};

const getProcessMachineDetailSuccess = processmachine => {
  return {
    type: GET_PROCESS_MACHINE_SUCCESS,
    processmachine
  };
};

const getProcessMachineDetailFail = error => {
  return {
    type: GET_PROCESS_MACHINE_FAIL,
    error: error
  };
};

export const getProcessMachines = (token) => {
  return dispatch => {
      dispatch(getProcessMachineListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(processmachinesURL, headers)
        .then(res => {
          const processmachines = res.data;
          dispatch(getProcessMachineListSuccess(processmachines));
          })
        .catch(err => {
          dispatch(getProcessMachineListStart(err));
        });
    };
};

export const getProcessMachine = (id, token) => {
  return dispatch => {
      dispatch(getProcessMachineDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${processmachinesURL}${id}`, headers)
        .then(res => {
          const processmachine = res.data;
          dispatch(getProcessMachineDetailSuccess(processmachine));
          })
        .catch(err => {
          dispatch(getProcessMachineDetailFail(err));
        });
    };
};

export const addProcessMachine = (processmachine, token) => {
  return dispatch => {
      dispatch(createProcessMachineStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(processmachinesURL, processmachine, headers)
        .then(res => {
          dispatch(createProcessMachineSuccess(processmachine));
        })
        .catch(err => {
          dispatch(createProcessMachineFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editProcessMachine = (id, processmachine, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${processmachinesURL}${id}/`, processmachine, headers)
    .then(res => {
        dispatch({
            type: EDIT_PROCESS_MACHINE,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
