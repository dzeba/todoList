import React from "react";
import { connect } from "react-redux";
import { saveName } from "../../ducks/todos";
import TodoForm from "../TodoList/TodoForm";
import "../TodoList/todo.css";

class EditProduct extends React.Component {
  render() {
    return (
      <div className="userNameBlock">
        <div className="centerText3">
          Lets start! What is your name?<br/>
          <TodoForm saveName={this.props.saveName}/>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    one: state.todos.one
  }),
  {
    saveName
  }
)(EditProduct);
