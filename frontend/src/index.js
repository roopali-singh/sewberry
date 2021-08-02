import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import reducer, { initialState } from "./reducer";
import { StateProvider } from "./StateProvider";
// LOGROCKET ////////////////////////////////
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";

/////////////////////////////////////////////

ReactDOM.render(
  <React.StrictMode>
    <StateProvider reducer={reducer} initialState={initialState}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// LOGROCKET ////////////////////////////////
LogRocket.init("bvhi2t/sewberry");
LogRocket.identify("THE_USER_ID_IN_YOUR_APP", {
  name: "roopali",
  email: "roopali.singh.222@gmail.com",
});
setupLogRocketReact(LogRocket);

/////////////////////////////////////////////

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
