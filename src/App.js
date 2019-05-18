import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";

import Counter from "./components/Counter";
import Todo from "./components/Todo";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/todo">Todo</Link> <Link to="/counter">Counter</Link>
        <Route exact path="/" component={Todo} />
        <Route path="/todo" component={Todo} />
        <Route path="/counter" component={Counter} />
      </Router>
      {/* <Todo /> */}
      {/* <Counter /> */}
    </div>
  );
}

export default App;
