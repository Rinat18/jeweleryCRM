import React, { createContext, useContext, useReducer } from "react";
import { API, token } from "../consts/const";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const authContext = createContext();
export const useAuth = () => useContext(authContext);

const INIT_STATE = {
  users: [],
  user: [],
  oneUser: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case token.GET_TOKEN:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};
export default function AuthContext({ children }) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const navigate = useNavigate();

  const login = async (formData) => {
    try {
      const { data } = await axios.post(`${API}:8000/api/token/`, formData);
      console.log(data);
      dispatch({
        type: token.GET_TOKEN,
        payload: data.user_info,
      });
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user", data.user_info);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const refreshAccessToken = (formData) => {
    axios
      .post(`${API}:8000/api/token/refresh/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.access);
        localStorage.setItem("access", response.data.access);
      });
  };

  const values = { login, refreshAccessToken };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}
