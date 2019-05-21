import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

import "./App.css";

import Counter from "./components/Counter";
import Todo from "./components/Todo";
import ProductsList from "./components/Products/ProductsList";
import ShowProducts from "./components/Products/ShowProducts";
import NewProducts from "./components/Products/NewProducts";
import EditProducts from "./components/Products/EditProducts";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <Link className="nav-link" to="/todo">
            Todo
          </Link>
          <Link className="nav-link" to="/counter">
            Counter
          </Link>
          <Link className="nav-link" to="/products">
            Products
          </Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Todo} />
          <Route path="/todo" component={Todo} />
          <Route path="/counter" component={Counter} />

          <Route path="/products/new" component={NewProducts} />
          <Route path="/products/:id/edit" component={EditProducts} />
          <Route path="/products/:id" component={ShowProducts} />
          <Route path="/products" component={ProductsList} />

          <Redirect from="/" to="/todo" />
        </Switch>
      </Router>
      {/* <Todo /> */}
      {/* <Counter /> */}
    </div>
  );
}

export default App;
