import React from "react";
import { connect } from "react-redux";
import {
  fetchProducts,
  productsSelector,
  isLoadingSelector
} from "../../ducks/products";

import { Link } from "react-router-dom";

class ProductsList extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <div>
        <h1>ProductsList</h1>
        <h3>
          <Link to="/products/new">New Product</Link>
        </h3>
        {this.props.isLoading && <div>Loading...</div>}

        {this.props.products.map(product => (
          <div key={product.id}>
            <span>{product.id}</span>
            <Link to={`/products/${product.id}`}>{product.name}</Link>{" "}
            <Link to={`/products/${product.id}/edit`}>Edit</Link>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(
  state => ({
    products: productsSelector(state),
    isLoading: isLoadingSelector(state)
  }),
  { fetchProducts }
)(ProductsList);
