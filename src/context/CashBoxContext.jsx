import React from "react";

const cashBox = createContext();
export const useCash = () => useContext(cashBox);

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

export default function CashBoxContext() {
  return <div></div>;
}
