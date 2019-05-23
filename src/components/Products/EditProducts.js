import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  saveEdited,
  productSelector,
  fetchProduct,
  isLoadingSelector
} from "../../ducks/products";

class EditProduct extends React.Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
    console.log("From did mount edit prod", this.props.match.params.id);
  }
  render() {
    const { product, isLoading } = this.props;

    if (isLoading) return <div>Loading...</div>;
    if (!product) return null;
    console.log("From render", this.props);

    return (
      <div>
        <h1>Edit product</h1>

        <Formik
          initialValues={{
            id: product.id,
            name: product.name,
            description: product.description
          }}
          validate={values => {
            let errors = {};
            if (!values.name) {
              errors.name = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            this.props.saveEdited(values).then(product => {
              setSubmitting(false);
              if (product) {
                const url = `/products/${product.id}`;
                this.props.history.push(url);
              }
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label>ID</label>
                <Field type="text" name="id" disabled />
                <ErrorMessage name="name" component="div" />
              </div>
              <div>
                <label>name</label>
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="div" />
              </div>

              <div>
                <label>description</label>
                <Field type="text" name="description" />
                <ErrorMessage name="description" component="div" />
              </div>

              <div>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default connect(
  state => ({
    product: productSelector(state),
    isLoading: isLoadingSelector(state)
  }),
  {
    saveEdited,
    fetchProduct
  }
)(withRouter(EditProduct));
