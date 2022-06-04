import axios from 'axios'
import {combineReducers} from 'redux'

const Action_GET_Req='GET_REQ';
const Action_GET_Suc='GET_SUC';
const Action_GET_Err='GET_ERR';

 const GetAllUsers = () => async dispatch =>{
    try {
        dispatch({
          type: Action_GET_Req,
        })
        const {data} = await axios.get(`/api/users`)  
        dispatch({
          type: Action_GET_Suc,
          payload: data,
        })
      } catch (error) {
        dispatch({
          type: Action_GET_Err,
          payload: error.response && error.response.data.msg ? error.response.data.msg : error.message,
        })
      }
}

const GetAllUsersReducer= (state = {users: []}, action) => {
  switch (action.type) {
    case Action_GET_Req:
      return {loading: true}

    case Action_GET_Suc:
      return {loading: false, users: action.payload}

    case Action_GET_Err:
      return {loading: false, error: action.payload}

    default:
      return state
  }
}

export default {
  GetAllUsers,
 GetAllUsersReducer
}



