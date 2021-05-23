import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ContextProvider } from "./Context/CartContext";
import { ReducerContext } from "./Context/SortFilerContext";
import { SignInContextProv } from "./Context/SignInContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <SignInContextProv>
        <ContextProvider>
          <ReducerContext>
            <App />
          </ReducerContext>
        </ContextProvider>
      </SignInContextProv>
    </Router>
  </StrictMode>,
  rootElement
);
