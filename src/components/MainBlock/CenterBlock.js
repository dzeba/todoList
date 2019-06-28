import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Clock from "react-live-clock";
import "../TodoList/todo.css";
import { saveTask } from "../../ducks/todos";
import TodoForm from "../TodoList/TodoForm";
import TaskOnDay from "./TaskOnDay";

class CenterBlock extends React.Component {
  render() {
    return (
      <div className="centerBlock">
        <div className="clock"><Clock format={"HH:mm"} ticking={true} /></div>
        <div className="centerText1">
          Good day, {this.props.one.name}
          <Link className="mainMenu__itemLink" to="/todo/name">
            {" "}<span className="centerName">(change)</span>
          </Link>
        </div>
        <div className="centerText2">What is your main focus for today?</div>
        <TodoForm saveName={this.props.saveTask} />
        <TaskOnDay />
      </div>
    );
  }
}

export default connect(
  state => ({
    one: state.todos.one,
    task: state.todos.task,
  }),
  {
    saveTask
  }
)(CenterBlock);
