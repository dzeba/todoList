import React from "react";
import { connect } from "react-redux";
import ShowTodo from "./TodoList/ShowTodo";
import CenterBlock from "./MainBlock/CenterBlock";
import { fetchList, fetchItem } from "../ducks/todos";
import "./TodoList/todo.css";

class TodoMain extends React.Component {
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
        <CenterBlock />
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
)(TodoMain);
