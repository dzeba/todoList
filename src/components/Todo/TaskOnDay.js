import React from "react";
import { connect } from "react-redux";
import { isLoadingSelector } from "../../ducks/todos";
import { fetchTask } from "../../ducks/todos";

import "./todo.css";

class TaskOnDay extends React.Component {
  componentDidMount() {
    this.props.fetchTask();
  }
  render() {
    if (!this.props.task) return <div>Loading...</div>;
    return (
      <div className="centerText3">
        Today<br/> {this.props.task.name}
      </div>
    );
  }
}

export default connect(
  state => ({
    task: state.todos.task,
    isLoading: isLoadingSelector(state)
  }),
  {
    fetchTask
  }
)(TaskOnDay);
