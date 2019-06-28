import React from "react";
import "./todo.css";
import NewItemForm from "./NewItemForm";
import NoItems from "./NoItems";

import { connect } from "react-redux";
import { handleIsDone } from "../../ducks/todos";
import { changeText } from "../../ducks/todos";
import { showActive } from "../../ducks/todos";
import { showAll } from "../../ducks/todos";
import { deleteItem } from "../../ducks/todos";
import {
  showDone,
  filterTodos,
  fetchList,
  isLoadingSelector,
  errorMessageSelector
} from "../../ducks/todos";

class List extends React.Component {
  render() {
    return (
      <div className="todoMainBlock">
        <NewItemForm />

        <button onClick={this.props.showActive}>Active</button>
        <button onClick={this.props.showAll}>All</button>
        <button onClick={this.props.showDone}>Done</button>
        <div>
          {filterTodos(this.props.list, this.props.filter).length} of {" "}
          {this.props.list.length}{" "}
        </div>
        {this.props.isLoading && "Loading..."}
        {this.props.errorMessage}
        <NoItems />
        {filterTodos(this.props.list, this.props.filter).map(el => (
          <div className="todoItem"
               key={el.id}

          >
            <input
              className="checkItem"
              type="checkbox"
              checked={el.isDone}
              onChange={e => this.props.handleIsDone(el.id, e.target.checked)}
            />
            <div
              style={{
                textDecoration: el.isDone ? "line-through" : "none",
                color: el.isDone ? "grey" : "white"
              }}
              className="todoText">{el.text}</div>

            <button className="closeItem" onClick={() => this.props.deleteItem(el.id)}>X</button>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(
  state => ({
    list: state.todos.list,
    one: state.todos.one,
    filter: state.todos.filter,
    isLoading: isLoadingSelector(state),
    errorMessage: errorMessageSelector(state)
  }),
  {
    handleIsDone,
    changeText,
    showActive,
    showAll,
    showDone,
    filterTodos,
    deleteItem,
    fetchList
  }
)(List);
