import React from "react";
import { connect } from "react-redux";

import List from "./List";
import ShowTodo from "./ShowTodo";
import Center from "./Center";
import { fetchList, fetchItem } from "../../ducks/todos";
import "./todo.css";

class Todo extends React.Component {
  componentDidMount() {
    this.props.fetchList();
    this.props.fetchItem();
  }
  render() {
    if (!this.props.one) return <div>Loading...</div>;
    else if (this.props.one.name === "") {
      const url = `/todo/name`;
      this.props.history.push(url);
    }
    return (
      <div className="todoMain">
        <Center />
        <ShowTodo />
      </div>
    );
  }
}

export default connect(
  state => ({
    one: state.todos.one
  }),
  { fetchList, fetchItem }
)(Todo);
