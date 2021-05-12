import { 
    GET_PROCESS_MACHINES_START,
    GET_PROCESS_MACHINES_SUCCESS,
    GET_PROCESS_MACHINES_FAIL,
    GET_PROCESS_MACHINE_START,
    GET_PROCESS_MACHINE_SUCCESS,
    GET_PROCESS_MACHINE_FAIL,
    CREATE_PROCESS_MACHINE_START,
    CREATE_PROCESS_MACHINE_SUCCESS,
    CREATE_PROCESS_MACHINE_FAIL,
    EDIT_PROCESS_MACHINE
} from "../types/processmachineTypes";
import { updateObject } from "../utility";

const initialState = {
    processmachines: [],
    processmachine: {},
    loading: false,
    error: null,
}

const getProcessMachineListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProcessMachineListSuccess = (state, action) => {
  return updateObject(state, {
    processmachines: action.processmachines,
    error: null,
    loading: false
  });
};

const getProcessMachineListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createProcessMachineStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createProcessMachineSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createProcessMachineFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProcessMachineDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProcessMachineDetailSuccess = (state, action) => {
  return updateObject(state, {
    processmachine: action.processmachine,
    error: null,
    loading: false
  });
};

const getProcessMachineDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function processmachines(state = initialState, action){
    switch(action.type){
        case GET_PROCESS_MACHINES_START:
            return getProcessMachineListStart(state, action);
        case GET_PROCESS_MACHINES_SUCCESS:
            return getProcessMachineListSuccess(state, action);
        case GET_PROCESS_MACHINES_FAIL:
            return getProcessMachineListFail(state, action);
        case GET_PROCESS_MACHINE_START:
            return getProcessMachineDetailStart(state, action);
        case GET_PROCESS_MACHINE_SUCCESS:
            return getProcessMachineDetailSuccess(state, action);
        case GET_PROCESS_MACHINE_FAIL:
            return getProcessMachineDetailFail(state, action);
        case CREATE_PROCESS_MACHINE_START:
            return createProcessMachineStart(state, action);
        case CREATE_PROCESS_MACHINE_SUCCESS:
            return createProcessMachineSuccess(state, action);
        case CREATE_PROCESS_MACHINE_FAIL:
            return createProcessMachineFail(state, action);
        case EDIT_PROCESS_MACHINE:
            const arrayList = state.processmachines;
            arrayList.splice(arrayList.findIndex(item => item.id === action.payload.data.id), 1 , action.payload.data);
            return {
                ...state,
                processmachines: arrayList,
            };
        default:
            return state;
    }
}
