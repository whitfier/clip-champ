import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Vod from "./components/Vod";
import Home from "./components/Home";
import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/vod/:id">
          <Vod />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
