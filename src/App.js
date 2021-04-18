import "antd/dist/antd.css";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Restaurant from "./templates/restaurant";
import Admin from "./templates/admin";
import Home from "./templates/Home";
import Register from "./components/Register";
import CreateRestaurant from "./templates/page/createRestaurant"
function App() {
  return (
    <div className="App">
      <Router>
          <Route exact path="/" component={Home} />
          <Route path="/createRestaurant" component={CreateRestaurant} />
          <Route path="/restaurant" component={Restaurant} />
          <Route path="/admin" component={Admin} />
          <Route path="/register" component={Register} />
      </Router>
    </div>
  );
}

export default App;
