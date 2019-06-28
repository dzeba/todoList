import React from "react";
import List from "./List";

import "./todo.css";

export default class ShowTodo extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = { showResults: false };
  }
  onClick() {
    if (!this.state.showResults) {
      this.setState({ showResults: true });
    } else {
      this.setState({ showResults: false });
    }
  }
  render() {
    return (
      <div>
      <button className="toogleTodo" onClick={this.onClick}> Todo</button>
        {this.state.showResults ? <List /> : null}
      </div>
    );
  }
}