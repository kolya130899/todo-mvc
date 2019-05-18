import React from "react";
import { connect } from 'react-redux'
import { increase } from '../ducks/counter'


class Increase extends React.Component {
  render() {
    return (
      <div>
        <h1>ReduxIncrease</h1>
        <button onClick={() => this.props.increase(10)}>+10</button>
      </div>
    );
  }
}

const mapDispatchToProps = { increase }

export default connect(
  null,
  mapDispatchToProps
)(Increase)
