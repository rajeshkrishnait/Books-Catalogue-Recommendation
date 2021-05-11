
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
// import RTL from "layouts/RTL.js";
import Authen from "layouts/Registration.js";
import "assets/css/material-dashboard-react.css?v=1.9.0";
import Log from "layouts/Login.js";
const hist = createBrowserHistory();

ReactDOM.render(
    <BrowserRouter>
    <Switch>
    <Route exact path="/" component={Authen} />
    <Route path="/Login" component={Log} />
    <Route path="/admin" component={Admin} />
    <Redirect to='/'/>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
