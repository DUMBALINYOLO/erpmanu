import axios from 'axios';
import {
    GET_ACCOUNTING_POSTS_START,
    GET_ACCOUNTING_POSTS_SUCCESS,
    GET_ACCOUNTING_POSTS_FAIL,
    CREATE_ACCOUNTING_POST_START,
    CREATE_ACCOUNTING_POST_SUCCESS,
    CREATE_ACCOUNTING_POST_FAIL,
    GET_ACCOUNTING_POST_START,
    GET_ACCOUNTING_POST_SUCCESS,
    GET_ACCOUNTING_POST_FAIL,
    EDIT_ACCOUNTING_POST
    } from '../types/accountingpostTypes';
import { accountingpostsURL } from '../constants';

//accounting posts
const getAccountingPostListStart = () => {
  return {
    type: GET_ACCOUNTING_POSTS_START
  };
};

const getAccountingPostListSuccess = accountingposts => {
  return {
    type: GET_ACCOUNTING_POSTS_SUCCESS,
    accountingposts
  };
};

const getAccountingPostListFail = error => {
  return {
    type: GET_ACCOUNTING_POSTS_FAIL,
    error: error
  };
};

const createAccountingPostStart = () => {
  return {
    type: CREATE_ACCOUNTING_POST_START
  };
};


const createAccountingPostSuccess = accountingpost => {
  return {
    type: CREATE_ACCOUNTING_POST_SUCCESS,
    accountingpost
  };
};

const createAccountingPostFail = error => {
  return {
    type: CREATE_ACCOUNTING_POST_FAIL,
    error: error
  };
};

const getAccountingPostDetailStart = () => {
  return {
    type: GET_ACCOUNTING_POST_START
  };
};

const getAccountingPostDetailSuccess = accountingpost => {
  return {
    type: GET_ACCOUNTING_POST_SUCCESS,
    accountingpost
  };
};

const getAccountingPostDetailFail = error => {
  return {
    type: GET_ACCOUNTING_POST_FAIL,
    error: error
  };
};

export const getAccountingPosts = (token) => {
  return dispatch => {
      dispatch(getAccountingPostListStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(accountingadjustmentsURL, headers)
        .then(res => {
          const accountingposts = res.data;
          dispatch(getAccountingPostListSuccess(accountingposts));
          })
        .catch(err => {
          dispatch(getAccountingPostListStart(err));
        });
    };
};

export const getAccountingPost = (id, token) => {
  return dispatch => {
      dispatch(getAccountingPostDetailStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`${accountingadjustmentsURL}${id}`, headers)
        .then(res => {
          const accountingpost = res.data;
          dispatch(getAccountingPostDetailSuccess(accountingpost));
          })
        .catch(err => {
          dispatch(getAccountingPostDetailFail(err));
        });
    };
};

export const addAccountingPost = (accountingpost, token) => {
  return dispatch => {
      dispatch(createAccountingPostStart());
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(accountingadjustmentsURL, accountingpost, headers)
        .then(res => {
          dispatch(createAccountingPostSuccess(accountingpost));
        })
        .catch(err => {
          dispatch(createAccountingPostFail(err));
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    };
};

export const editAccountingPost = (id, accountingpost, token) => dispatch => {
    const headers ={
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          'Accept': 'application/json',
    };
    JSON.stringify(id, null, 3)
    axios.patch(`${accountingadjustmentsURL}${id}/`, accountingpost, headers)
    .then(res => {
        dispatch({
            type: EDIT_ACCOUNTING_POST,
            payload: res.data
        });
    }).catch(err => console.log(err))
}
