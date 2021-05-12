import axios from 'axios';
import { 
    GET_PROCESS_MACHINE_GROUPS_START,
    GET_PROCESS_MACHINE_GROUPS_SUCCESS,
    GET_PROCESS_MACHINE_GROUPS_FAIL,
    CREATE_PROCESS_MACHINE_GROUP_START,
    CREATE_PROCESS_MACHINE_GROUP_SUCCESS,
    CREATE_PROCESS_MACHINE_GROUP_FAIL,
    GET_PROCESS_MACHINE_GROUP_START,
    GET_PROCESS_MACHINE_GROUP_SUCCESS,
    GET_PROCESS_MACHINE_GROUP_FAIL,
    EDIT_PROCESS_MACHINE_GROUP 
} from '../types/processmachinegroupTypes';
import { processmachinegroupsURL } from '../constants';

//process machine groups
const getProcessMachineGroupListStart = () => {
  return {
    type: GET_PROCESS_MACHINE_GROUPS_START
  };
};

const getProcessMachineGroupListSuccess = processmachinegroups => {
  return {
    type: GET_PROCESS_MACHINE_GROUPS_SUCCESS,
    processmachinegroups
  };
};

const getProcessMachineGroupListFail = error => {
  return {
    type: GET_PROCESS_MACHINE_GROUPS_FAIL,
    error: error
  };
};

const createProcessMachineGroupStart = () => {
  return {
    type: CREATE_PROCESS_MACHINE_GROUP_START
  };
};


const createProcessMachineGroupSuccess = processmachinegroup => {
  return {
    type: CREATE_PROCESS_MACHINE_GROUP_SUCCESS,
    processmachinegroup
  };
};

const createProcessMachineGroupFail = error => {
  return {
    type: CREATE_PROCESS_MACHINE_GROUP_FAIL,
    error: error
  };
};

const getProcessMachineGroupDetailStart = () => {
  return {
    type: GET_PROCESS_MACHINE_GROUP_START
  };
};

const getProcessMachineGroupDetailSuccess = processmachinegroup => {
  return {
    type: GET_PROCESS_MACHINE_GROUP_SUCCESS,
    processmachinegroup
  };
};

const getProcessMachineGroupDetailFail = error => {
  return {
    type: GET_PROCESS_MACHINE_GROUP_FAIL,
    error: error
  };
};

export const getProcessMachineGroups = (token) => {
  return dispatch => {
      dispatch(getProcessMachineGroupListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(processmachinegroupsURL, headers)
        .then(res => {
          const processmachinegroups = res.data;
          dispatch(getProcessMachineGroupListSuccess(processmachinegroups));
          })
        .catch(err => {
          dispatch(getProcessMachineGroupListStart(err));
        });
    };
};

export const getProcessMachineGroup = (id, token) => {
  return dispatch => {
      dispatch(getProcessMachineGroupDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${processmachinegroupsURL}${id}`, headers)
        .then(res => {
          const processmachinegroup = res.data;
          dispatch(getProcessMachineGroupDetailSuccess(processmachinegroup));
          })
        .catch(err => {
          dispatch(getProcessMachineGroupDetailFail(err));
        });
    };
};

export const addProcessMachineGroup = (processmachinegroup, token) => {
  return dispatch => {
      dispatch(createProcessMachineGroupStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(processmachinegroupsURL, processmachinegroup, headers)
        .then(res => {
          dispatch(createProcessMachineGroupSuccess(processmachinegroup));
        })
        .catch(err => {
          dispatch(createProcessMachineGroupFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editProcessMachineGroup = (id, processmachinegroup, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${processmachinegroupsURL}${id}/`, processmachinegroup, headers)
    .then(res => {
        dispatch({
            type: EDIT_PROCESS_MACHINE_GROUP,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
