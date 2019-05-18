import React from "react";
import { connect } from "react-redux";
import {
  showAll,
  showActive,
  showDone,
  filteredTodosSelector,
  fetchList
} from "../../ducks/todos";

function Filter({ number, showAll, showActive, showDone, fetchList }) {
  return (
    <div>
      {number}
      <button onClick={showAll}>showAll</button>
      <button onClick={showActive}>showActive</button>
      <button onClick={showDone}>showDone</button>

      <button onClick={fetchList}>load todos</button>
    </div>
  );
}

export default connect(
  state => ({
    number: filteredTodosSelector(state).length
  }),
  { showAll, showActive, showDone, fetchList }
)(Filter);
