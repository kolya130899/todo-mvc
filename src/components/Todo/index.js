import React from "react";
import { connect } from "react-redux";
import { fetchList } from "../../ducks/todos";

import NewItemForm from "./NewItemForm";
import List from "./List";
import Filter from "./Filter";

class Todo extends React.Component {
  componentDidMount() {
    this.props.fetchList();
  }
  render() {
    return (
      <div>
        <h1>TODO</h1>
        <NewItemForm />
        <List />
        <Filter />
      </div>
    );
  }
}

export default connect(
  null,
  { fetchList }
)(Todo);
