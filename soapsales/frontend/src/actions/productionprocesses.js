import axios from 'axios';
import { 
	GET_ACCOUNTING_ADJUSTMENTS_START,
	GET_ACCOUNTING_ADJUSTMENTS_SUCCESS,
	GET_ACCOUNTING_ADJUSTMENTS_FAIL 
} from './types';
import { productionprocessesURL } from '../constants';

//production processes
const getProductionProcessListStart = () => {
  return {
    type: GET_ACCOUNTING_ADJUSTMENTS_START
  };
};

const getProductionProcessListSuccess = productionprocesses => {
  return {
    type: GET_ACCOUNTING_ADJUSTMENTS_SUCCESS,
    productionprocesses
  };
};

const getProductionProcessListFail = error => {
  return {
    type: GET_ACCOUNTING_ADJUSTMENTS_FAIL,
    error: error
  };
};

export const getProductionProcesses = (token) => {
  return dispatch => {
      dispatch(getProductionProcessListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(productionprocessesURL, headers)
        .then(res => {
          const productionprocesses = res.data;
          dispatch(getProductionProcessListSuccess(productionprocesses));
          })
        .catch(err => {
          dispatch(getProductionProcessListStart(err));
        });
    };
};
