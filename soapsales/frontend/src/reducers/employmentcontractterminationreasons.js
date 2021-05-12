import { 
    GET_EMPLOYMENT_CONTRACT_TERMINATION_REASONS_START,
    GET_EMPLOYMENT_CONTRACT_TERMINATION_REASONS_SUCCESS,
    GET_EMPLOYMENT_CONTRACT_TERMINATION_REASONS_FAIL 
} from '../actions/types.js';
import { updateObject } from "../utility";

const initialState = {
    employmentcontractterminationreasons: [],
    loading: false,
    error: null,
}

const getEmploymentContractTerminationReasonListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEmploymentContractTerminationReasonListSuccess = (state, action) => {
  return updateObject(state, {
    employmentcontractterminationreasons: action.employmentcontractterminationreasons,
    error: null,
    loading: false
  });
};

const getEmploymentContractTerminationReasonListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default function employmentcontractterminationreasons(state = initialState, action){
    switch(action.type){
        case GET_EMPLOYMENT_CONTRACT_TERMINATION_REASONS_START:
            return getEmploymentContractTerminationReasonListStart(state, action);
        case GET_EMPLOYMENT_CONTRACT_TERMINATION_REASONS_SUCCESS:
            return getEmploymentContractTerminationReasonListSuccess(state, action);
        case GET_EMPLOYMENT_CONTRACT_TERMINATION_REASONS_FAIL:
            return getEmploymentContractTerminationReasonListFail(state, action);
        default:
            return state;
    }
}
