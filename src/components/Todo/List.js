import React from "react";
import { connect } from "react-redux";
import {
  changeItemIsDone,
  changeItemText,
  filteredTodosSelector,
  isLoadingSelector,
  errorMessageSelector,
  deleteItem
} from "../../ducks/todos";

class List extends React.Component {
  render() {
    const {
      filteredTodos,
      changeItemIsDone,
      changeItemText,
      deleteItem,
      isLoading,
      errorMessage
    } = this.props;

    return (
      <div>
        {isLoading && "Loading..."}
        {errorMessage}
        {filteredTodos.map(item => (
          <div
            key={item.id}
            style={{
              textDecoration: item.isDone ? "line-through" : "none",
              color: item.isDone ? "gray" : "black"
            }}
          >
            <input
              type="checkbox"
              checked={item.isDone}
              onChange={e => changeItemIsDone(item.id, e.target.checked)}
            />

            <input
              type="text"
              value={item.text}
              onChange={e => changeItemText(item.id, e.target.value)}
            />
            {item.text}

            <button onClick={() => deleteItem(item.id)}>x</button>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(
  state => ({
    filteredTodos: filteredTodosSelector(state),
    isLoading: isLoadingSelector(state),
    errorMessage: errorMessageSelector(state)
  }),
  { changeItemIsDone, changeItemText, deleteItem }
)(List);
