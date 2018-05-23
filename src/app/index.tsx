import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const isString = arg => typeof arg === "string";

const render = (Component: React.ComponentType) => {
  ReactDOM.render(<Component />, document.getElementById("app"));
};

render(App);

// Webpack Hot Module Replacement API
if ((module as any).hot) {
  // XXX: Warning from React Router, caused by React Hot Loader.
  // The warning can be safely ignored, so filter it from the console.
  const orgError = console.error;
  console.error = (...args) => {
    if (
      args &&
      args.length === 1 &&
      isString(args[0]) &&
      args[0].indexOf("You cannot change <Router history>")
    ) {
      // React route changed
    } else {
      // Log the error as normally
      orgError.apply(console, args);
    }
  };
  (module as any).hot.accept("./App", () => render(App));
}
