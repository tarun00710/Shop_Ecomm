import React, { createContext, useContext, useReducer } from "react";
const SortContext = createContext();

const reducerSort = (state, action) => {
  switch (action.type) {
    case "HIGH_TO_LOW":
      return { ...state, sortBy: action.payload };
    case "LOW_TO_HIGH":
      return { ...state, sortBy: action.payload };
    case "INSTOCK":
      return { ...state, stock: action.payload };
    case "OUTSTOCK":
      return { ...state, stock: action.payload };
    case "FASTDELIVERY":
      return { ...state, delivery: action.payload };  
    default:
      return { state };
  }
};

export const ReducerContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducerSort, {
    sortBy: null
  });
  return (
    <SortContext.Provider value={{ state, dispatch }}>
      {children}
    </SortContext.Provider>
  );
};
export const useSortFilter = () => {
  return useContext(SortContext);
};
