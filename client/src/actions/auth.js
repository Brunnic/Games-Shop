import axios from "axios";

import {
    USER_ERROR,
    USER_LOGIN,
    USER_LOGOUT,
    USER_REGISTER,
    GET_USER,
} from "./types";
  
const config = {
    headers: {
      "Content-Type": "application/json"
    }
}

export const login = (data, history, reload) => async dispatch => {
    try {
      const result = await axios.post("/api/auth/login", data, config);
  
      dispatch({
        type: USER_LOGIN,
        payload: result.data
      });
  
      history.push("/");
      reload();
    } catch (err) {
  
      dispatch({
        type: USER_ERROR,
        payload: err.response.data.error
      });
    }
  }

  export const register = (data, history) => async dispatch => {
    try {
      const result = await axios.post("/api/auth/register", data, config);
  
      dispatch({
        type: USER_REGISTER,
        payload: result.data
      });
  
      history.push("/");
    } catch (err) {
  
      dispatch({
        type: USER_ERROR,
        payload: err.message
      })
    }
  }
  
  export const getUser = () => async dispatch => {
    try {
      const result = await axios.get("/api/auth", config);
  
      dispatch({
        type: GET_USER,
        payload: result.data
      })
    } catch (err) {
  
      console.log(err.response);
  
      dispatch({
        type: USER_ERROR,
        payload: err.message
      });
    }
  }
  
  export const logout = (history, reload) => async dispatch => {
    try {
      const result = await axios.get("/api/auth/logout", config);
  
      dispatch({
        type: USER_LOGOUT,
        payload: result.data
      });

      history.push("/");
      reload();
      
    } catch (err) {
  
      console.log(err.response);
  
      dispatch({
        type: USER_ERROR,
        payload: err.message
      });
    }
  }