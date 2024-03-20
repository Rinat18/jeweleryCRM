import React, { createContext, useContext, useReducer } from "react";
const authContext = createContext();
export const useAuth = () => useContext(authContext);

const INIT_STATE = {
  users: [],
  user: [],
  oneUser: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
  }
};

export default function AuthContext({ children }) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const values = {};
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}
