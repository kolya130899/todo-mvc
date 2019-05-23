import React from "react";
import { connect } from "react-redux";
import {
  fetchProduct,
  productSelector,
  isLoadingSelector
} from "../../ducks/products";

class ShowProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
    console.log("from did mount", this.props.match.params.id);
  }
  render() {
    const { product, isLoading } = this.props;
    console.log("from render", this.props);

    if (isLoading) return <div>Loading...</div>;

    if (!product) return null;
    return (
      <div>
        Show product
        <h1>{product.name}</h1>
        <h1>{product.description}</h1>
      </div>
    );
  }
}

export default connect(
  state => ({
    product: productSelector(state),
    isLoading: isLoadingSelector(state)
  }),
  { fetchProduct }
)(ShowProducts);
