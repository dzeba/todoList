import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

import Todo from "./components/Todo/Todo";
import UserName from "./components/Todo/UserName";

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
          <Route path="/todo" component={Todo} />
          <Redirect exact from="/" to="/todo" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
