import React from "react";
import { connect } from "react-redux";
import { changeNewItemText, addNewItem } from "../../ducks/todos";

const NewItemForm = ({ newItemText, changeNewItemText, addNewItem }) => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        addNewItem();
      }}
    >
      <input
        type="text"
        value={newItemText}
        onChange={e => changeNewItemText(e.target.value)}
      />
    </form>
  );
};

export default connect(
  ({ todos }) => ({
    newItemText: todos.newItemText
  }),
  { changeNewItemText, addNewItem }
)(NewItemForm);
