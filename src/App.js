import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

import TodoMain from "./components/TodoMain";
import UserName from "./components/MainBlock/UserName";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul className="mainMenu">
            <li className="mainMenu__item">
              <Link className="mainMenu__itemLink" to="/todo/">
                todo
              </Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/todo/name" component={UserName} />
          <Route path="/todo" component={TodoMain} />
          <Redirect exact from="/" to="/todo" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
