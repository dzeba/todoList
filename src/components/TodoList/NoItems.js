import React from "react";
import "./todo.css";
import { connect } from "react-redux";

class NoItems extends React.Component {
  render() {
    if (this.props.list.length === 0) return <div>No todos yet</div>;
    return <div>{" "}</div>
  }
}

export default connect(
  state => ({
    list: state.todos.list
  }),
  {}
)(NoItems);
