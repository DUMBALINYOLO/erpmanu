import { 
    GET_PROCESS_MACHINE_GROUPS_START,
    GET_PROCESS_MACHINE_GROUPS_SUCCESS,
    GET_PROCESS_MACHINE_GROUPS_FAIL,
    GET_PROCESS_MACHINE_GROUP_START,
    GET_PROCESS_MACHINE_GROUP_SUCCESS,
    GET_PROCESS_MACHINE_GROUP_FAIL,
    CREATE_PROCESS_MACHINE_GROUP_START,
    CREATE_PROCESS_MACHINE_GROUP_SUCCESS,
    CREATE_PROCESS_MACHINE_GROUP_FAIL,
    EDIT_PROCESS_MACHINE_GROUP
} from "../types/processmachinegroupTypes";
import { updateObject } from "../utility";

const initialState = {
    processmachinegroups: [],
    processmachinegroup: {},
    loading: false,
    error: null,
}

const getProcessMachineGroupListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProcessMachineGroupListSuccess = (state, action) => {
  return updateObject(state, {
    processmachinegroups: action.processmachinegroups,
    error: null,
    loading: false
  });
};

const getProcessMachineGroupListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createProcessMachineGroupStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createProcessMachineGroupSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createProcessMachineGroupFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProcessMachineGroupDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const geProcessMachineGrouptDetailSuccess = (state, action) => {
  return updateObject(state, {
    processmachinegroup: action.processmachinegroup,
    error: null,
    loading: false
  });
};

const getProcessMachineGroupDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function processmachinegroups(state = initialState, action){
    switch(action.type){
        case GET_PROCESS_MACHINE_GROUPS_START:
            return getProcessMachineGroupListStart(state, action);
        case GET_PROCESS_MACHINE_GROUPS_SUCCESS:
            return getProcessMachineGroupListSuccess(state, action);
        case GET_PROCESS_MACHINE_GROUPS_FAIL:
            return getProcessMachineGroupListFail(state, action);
        case GET_PROCESS_MACHINE_GROUP_START:
            return getProcessMachineGroupDetailStart(state, action);
        case GET_PROCESS_MACHINE_GROUP_SUCCESS:
            return getProcessMachineGroupDetailSuccess(state, action);
        case GET_PROCESS_MACHINE_GROUP_FAIL:
            return getProcessMachineGroupDetailFail(state, action);
        case CREATE_PROCESS_MACHINE_GROUP_START:
            return createProcessMachineGroupStart(state, action);
        case CREATE_PROCESS_MACHINE_GROUP_SUCCESS:
            return createProcessMachineGroupSuccess(state, action);
        case CREATE_PROCESS_MACHINE_GROUP_FAIL:
            return createProcessMachineGroupFail(state, action);
        case EDIT_PROCESS_MACHINE_GROUP:
            const arrayList = state.processmachinegroups;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                processmachinegroups: arrayList,
            };
        default:
            return state;
    }
}
